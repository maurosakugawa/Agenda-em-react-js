// back/src/db/index.js
import { PGlite } from '@electric-sql/pglite';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import logger from '../utils/logger.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PG_DATA_PATH = process.env.PG_DATA_PATH
    ? join(__dirname, '../../', process.env.PG_DATA_PATH)
    : join(__dirname, '../../pgdata');

let dbInstance = null;
let dbReady = false;

export async function getDb() {
    if (dbInstance && dbReady) {
        return dbInstance;
    }

    if (dbInstance && !dbReady) {
        await new Promise(resolve => {
            const check = () => {
                if (dbReady) resolve();
                else setTimeout(check, 50);
            };
            check();
        });
        return dbInstance;
    }

    try {
        logger.info('Inicializando Pglite...', PG_DATA_PATH);

        dbInstance = new PGlite(PG_DATA_PATH);
        await dbInstance.waitReady;
        dbReady = true;

        logger.success('Pglite pronto');

        // ✅ Sempre inicializa tabelas em development
        await initializeTables();

        return dbInstance;
    } catch (err) {
        logger.error('Falha ao inicializar Pglite:', err.message);
        dbInstance = null;
        dbReady = false;
        throw err;
    }
}

async function initializeTables() {
    try {
        logger.info('Criando/atualizando tabelas...');

        await dbInstance.exec(`
            -- Tabela de usuários
            CREATE TABLE IF NOT EXISTS tbusuario (
                idusuario SERIAL PRIMARY KEY,
                mail TEXT NOT NULL UNIQUE,
                senha TEXT NOT NULL,
                nome TEXT,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- ✅ Tabela de contatos COM ENDEREÇO NORMALIZADO
            CREATE TABLE IF NOT EXISTS tbcontato (
                idcontato SERIAL PRIMARY KEY,
                idusuario INTEGER NOT NULL REFERENCES tbusuario(idusuario) ON DELETE CASCADE,
                nome TEXT NOT NULL,
                telefone TEXT NOT NULL,
                aniversario DATE,
                
                -- ✅ Endereço separado para busca/normalização eficiente
                logradouro TEXT,           -- Ex: "R Crato" (normalizado)
                numero VARCHAR(20),        -- Ex: "1101", "123A"
                bairro TEXT,               -- Ex: "Jardim Aquarius"
                complemento TEXT,          -- Ex: "Apto 101", "Bloco B"
                cidade TEXT,
                estado VARCHAR(2),
                cep VARCHAR(9),
                
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- ✅ Índices otimizados para busca
            CREATE INDEX IF NOT EXISTS idx_contato_usuario ON tbcontato(idusuario);
            CREATE INDEX IF NOT EXISTS idx_contato_nome ON tbcontato(nome);
            CREATE INDEX IF NOT EXISTS idx_contato_logradouro ON tbcontato(logradouro);  -- Busca por rua
            CREATE INDEX IF NOT EXISTS idx_contato_bairro ON tbcontato(bairro);          -- Busca por bairro
            CREATE INDEX IF NOT EXISTS idx_contato_cidade_estado ON tbcontato(cidade, estado);
            CREATE INDEX IF NOT EXISTS idx_contato_cep ON tbcontato(cep);
            
            -- ✅ ÍNDICE ÚNICO: impede telefone duplicado por usuário
            CREATE UNIQUE INDEX IF NOT EXISTS idx_contato_usuario_telefone 
            ON tbcontato(idusuario, telefone);
        `);

        logger.success('✅ Tabelas e índices criados/atualizados com sucesso!');

    } catch (err) {
        logger.error('❌ Erro ao criar tabelas:', err.message);
        throw err;
    }
}

export async function closeDb() {
    if (dbInstance) {
        await dbInstance.close();
        dbInstance = null;
        dbReady = false;
        logger.info('Pglite fechado');
    }
}

export { initializeTables };