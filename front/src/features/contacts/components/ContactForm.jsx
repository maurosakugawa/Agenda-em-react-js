// front/src/features/contacts/components/ContactForm.jsx
import { useState, useCallback } from 'react';
import { Button } from '@/shared/components/Button.jsx';
import { usePhoneMask } from '@/shared/hooks/usePhoneMask.js';
import { useDateMask } from '@/shared/hooks/useDateMask.js';
import { useCEP } from '@/shared/hooks/useCEP.js';  // ← ← ← Corrigido: alias + .js

export function ContactForm({ onSubmit, loading, redirectAfter = '/contatos' }) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [aniversario, setAniversario] = useState('');

    // ✅ Campos de endereço com inicialização correta (string vazia)
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');      // ← ← ← Corrigido: ''
    const [bairro, setBairro] = useState('');      // ← ← ← Corrigido: ''
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    // cep é gerenciado pelo cepHook

    // Hooks de máscara
    const phoneMask = usePhoneMask(telefone);
    const dateMask = useDateMask(aniversario);
    const cepHook = useCEP();

    // Handler para quando o CEP for preenchido automaticamente
    const handleCEPAutoFill = useCallback((addressData) => {
        if (!addressData) return;

        setLogradouro(addressData.logradouro || '');
        setBairro(addressData.bairro || '');
        setCidade(addressData.localidade || '');
        setEstado(addressData.uf?.toUpperCase() || '');

        // ⚠️ A ViaCEP NÃO retorna o número - usuário deve digitar manualmente
        // Se quiser tentar extrair do complemento (raro):
        if (addressData.complemento) {
            const numMatch = addressData.complemento.match(/^(\d+)/);
            if (numMatch && !numero) {  // Só preenche se número estiver vazio
                setNumero(numMatch[1]);
            }
        }
    }, [numero]);  // ← ← ← Adicione numero nas dependências

    const handleSubmit = async (e) => {
        e.preventDefault();

        const contatoData = {
            nome,
            telefone: phoneMask.getRawValue(),
            aniversario: dateMask.toISO(),
            logradouro,              // ← ← ← Corrigido: era "logardouro"
            numero,
            bairro,
            complemento,
            cidade,
            estado: estado.toUpperCase(),
            cep: cepHook.getCleanCEP()
        };

        console.log('📤 Enviando contato:', contatoData);  // ← Debug

        const result = await onSubmit(contatoData);

        if (result.success && redirectAfter) {
            // Limpa formulário
            setNome('');
            phoneMask.clearValue();
            dateMask.clearValue();
            setLogradouro('');
            setNumero('');
            setBairro('');
            setComplemento('');
            setCidade('');
            setEstado('');
            cepHook.clearCEP();
        }
    };

    // Seção do form
    return (
        <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">

                {/* Nome e Telefone na mesma linha */}
                <div className="form-row">
                    <div className="form-group flex-2">
                        <label htmlFor="nome" className="form-label">Nome *</label>
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome completo"
                            required
                            disabled={loading}
                            className="input"
                        />
                    </div>

                    <div className="form-group flex-1">
                        <label htmlFor="telefone" className="form-label">Telefone *</label>
                        <input
                            id="telefone"
                            type="tel"
                            value={phoneMask.phone}
                            onChange={(e) => phoneMask.handleChange(e)}
                            placeholder="(11) 99999-9999"
                            required
                            disabled={loading}
                            className="input"
                            maxLength={15}
                        />
                    </div>
                </div>


                {/* Aniversário */}
                <div className="form-group">
                    <label htmlFor="aniversario" className="form-label">
                        Aniversário <span className="optional">(opcional)</span>
                    </label>
                    <input
                        id="aniversario"
                        type="text"
                        value={dateMask.date}
                        onChange={(e) => dateMask.handleChange(e)}
                        placeholder="dd/mm/aaaa"
                        disabled={loading}
                        className="input"
                        maxLength={10}
                    />
                </div>

                {/* ✅ Seção de Endereço(CEP, rua, número, bairro, complemento, cidade e estado) */}
                <div className="form-section address">
                    <h3 className="form-section-title">📍 Endereço</h3>

                    {/* CEP em destaque (busca automática) */}
                    <div className="form-group">
                        <label htmlFor="cep" className="form-label">
                            CEP {cepHook.loading && '⏳'}
                        </label>
                        <input
                            id="cep"
                            type="text"
                            value={cepHook.cep}
                            onChange={cepHook.handleChange}
                            onBlur={() => cepHook.handleBlur(handleCEPAutoFill)}
                            placeholder="00000-000 (digite para buscar endereço)"
                            disabled={loading}
                            className="input"
                            maxLength={9}
                        />
                        {cepHook.error && (
                            <span className="form-error" style={{
                                color: '#ef4444',
                                fontSize: '0.875rem',
                                marginTop: '0.25rem',
                                display: 'block'
                            }}>
                                {cepHook.error}
                            </span>
                        )}
                    </div>

                    {/* Logradouro e Número na mesma linha */}
                    <div className="form-row">
                        <div className="form-group flex-2">
                            <label htmlFor="logradouro" className="form-label">
                                Logradouro <span className="optional">(opcional)</span>
                            </label>
                            <input
                                id="logradouro"
                                type="text"
                                value={logradouro}
                                onChange={(e) => setLogradouro(e.target.value)}
                                placeholder="Rua, avenida, etc."
                                disabled={loading}
                                className="input"
                            />
                        </div>

                        <div className="form-group flex-1">
                            <label htmlFor="numero" className="form-label">
                                Número <span className="optional">(opcional)</span>
                            </label>
                            <input
                                id="numero"
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder="123"
                                disabled={loading}
                                className="input"
                            />
                        </div>
                    </div>

                    {/* Bairro e Complemento na mesma linha */}
                    <div className="form-row">
                        <div className="form-group flex-2">
                            <label htmlFor="bairro" className="form-label">
                                Bairro <span className="optional">(opcional)</span>
                            </label>
                            <input
                                id="bairro"
                                type="text"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                placeholder="Bairro"
                                disabled={loading}
                                className="input"
                            />
                        </div>

                        <div className="form-group flex-1">
                            <label htmlFor="complemento" className="form-label">
                                Complemento <span className="optional">(opcional)</span>
                            </label>
                            <input
                                id="complemento"
                                type="text"
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)}
                                placeholder="Apto, bloco, etc."
                                disabled={loading}
                                className="input"
                            />
                        </div>
                    </div>

                    {/* Cidade e Estado na mesma linha */}
                    <div className="form-row">
                        <div className="form-group flex-2">
                            <label htmlFor="cidade" className="form-label">
                                Cidade <span className="optional">(opcional)</span>
                            </label>
                            <input
                                id="cidade"
                                type="text"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                placeholder="Cidade"
                                disabled={loading}
                                className="input"
                            />
                        </div>

                        <div className="form-group flex-1">
                            <label htmlFor="estado" className="form-label">
                                Estado <span className="optional">(opcional)</span>
                            </label>
                            <input
                                id="estado"
                                type="text"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                placeholder="UF"
                                disabled={loading}
                                className="input"
                                maxLength={2}
                            />
                        </div>
                    </div>
                </div>

                {/* Botão */}
                <div className="form-actions">
                    <Button
                        type="submit"
                        variant="success"
                        loading={loading}
                        disabled={!nome || !phoneMask.getRawValue()}
                    >
                        {loading ? 'Adicionando...' : 'Adicionar Contato'}
                    </Button>
                </div>
            </form>
        </div>
    );
}