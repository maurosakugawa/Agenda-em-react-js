// front/src/features/contacts/components/ContactCard.jsx
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/shared/components/Button.jsx';
import { usePhoneMask } from '@/shared/hooks/usePhoneMask.js';
import { useDateMask } from '@/shared/hooks/useDateMask.js';
import { useCEP } from '../../../shared/hooks/useCEP';
import { formatDateBR, extractDate } from '@/shared/utils/date.js';
import { formatPhoneBR } from '../../../shared/utils/phone';
import { formatCEP } from '@/shared/utils/cep.js';
import { expandLogradouro } from '@/shared/utils/address.js';

export function ContactCard({ contato, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);

    // Hooks de máscara
    const phoneMask = usePhoneMask(contato.telefone || '');
    const dateMask = useDateMask(contato.aniversario || '');
    const cepHook = useCEP();

    const [editData, setEditData] = useState({
        nome: contato.nome || '',
        logradouro: contato.logradouro || '',
        numero: contato.numero || '',
        bairro: contato.bairro || '',
        complemento: contato.complemento || '',
        cidade: contato.cidade || '',
        estado: contato.estado || '',
        cep: contato.cep || ''
    });

    const handleCEPAutoFill = useCallback((addressData) => {
        if (!addressData) return;

        setEditData(prev => ({
            ...prev,
            logradouro: addressData.logradouro || '',
            bairro: addressData.bairro || '',
            cidade: addressData.localidade || '',
            estado: addressData.uf?.toUpperCase() || ''
        }));
    }, []);

    // Sincroniza quando contato mudar
    useEffect(() => {
        phoneMask.setPhone(contato.telefone || '');
        dateMask.setDate(formatDateBR(contato.aniversario));  // ← ← ← Usa utilitário
        cepHook.setCEP(contato.cep || '');  // ← ← ← Sincroniza CEP

        setEditData({
            nome: contato.nome || '',
            logradouro: contato.logradouro || '',
            numero: contato.numero || '',
            bairro: contato.bairro || '',
            complemento: contato.complemento || '',
            cidade: contato.cidade || '',
            estado: contato.estado || '',
            cep: contato.cep || ''
        });
    }, [contato]);

    const handleDelete = async () => {
        if (!window.confirm('Deseja excluir este contato?')) return;

        try {
            const result = await onDelete(contato.idcontato);

            if (!result.success && result.error?.code !== 'CONTACT_NOT_FOUND') {
                alert(`❌ ${result.error || 'Erro ao excluir contato'}`);
            }
        } catch (err) {
            console.error('Erro inesperado:', err);
            alert('❌ Erro de conexão. Tente novamente.');
        }
    };

    const handleEdit = () => {
        setIsEditing(true);

        // Atualizar máscaras com valores formatados
        phoneMask.setPhone(contato.telefone || '');
        dateMask.setDate(formatDateBR(contato.aniversario));  // ← ← ← Usa utilitário
        cepHook.setCEP(contato.cep || '');

        // Resetar editData com valores atuais
        setEditData({
            nome: contato.nome || '',
            logradouro: contato.logradouro || '',
            numero: contato.numero || '',
            bairro: contato.bairro || '',
            complemento: contato.complemento || '',
            cidade: contato.cidade || '',
            estado: contato.estado || '',
            cep: contato.cep || ''
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        phoneMask.setPhone(contato.telefone || '');
        dateMask.setDate(formatDateBR(contato.aniversario));  // ← ← ← Usa utilitário
        cepHook.setCEP(contato.cep || '');

        setEditData({
            nome: contato.nome || '',
            logradouro: contato.logradouro || '',
            numero: contato.numero || '',
            bairro: contato.bairro || '',
            complemento: contato.complemento || '',
            cidade: contato.cidade || '',
            estado: contato.estado || '',
            cep: contato.cep || ''
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        // Extrair datas normalizadas para comparação
        const aniversarioOriginal = extractDate(contato.aniversario);  // ← ← ← Usa utilitário
        const aniversarioDigitado = dateMask.date;
        const aniversarioISO = dateMask.toISO();

        // Comparar apenas as partes de data (ignora hora/timezone)
        const aniversarioParaEnviar =
            (aniversarioDigitado === '' && aniversarioOriginal) ||
                (extractDate(aniversarioDigitado) === aniversarioOriginal)  // ← ← ← Usa utilitário
                ? contato.aniversario  // Mantém valor original do banco
                : aniversarioISO;      // Usa novo valor (ou null)

        const dadosParaEnviar = {
            ...editData,
            telefone: phoneMask.getRawValue(),
            aniversario: aniversarioParaEnviar,
            cep: cepHook.getCleanCEP()  // ← ← ← Envia apenas dígitos
        };

        // Log para debug (opcional, pode remover em produção)
        console.log('📤 Enviando update:', {
            contatoId: contato.idcontato,
            dados: dadosParaEnviar,
            aniversarioDebug: {
                original: contato.aniversario,
                digitado: aniversarioDigitado,
                enviado: aniversarioParaEnviar
            }
        });

        try {
            const result = await onEdit(contato.idcontato, dadosParaEnviar);

            if (result.success) {
                console.log('✅ Update bem-sucedido!');
                setIsEditing(false);
            } else {
                console.warn('⚠️ Update falhou:', result.error);
                alert(`❌ ${result.error || 'Erro ao atualizar contato'}`);
            }
        } catch (err) {
            console.error('💥 Erro inesperado no update:', err);
            alert('❌ Erro de conexão. Tente novamente.');
        }
    };

    // MODO DE EDIÇÃO
    if (isEditing) {
        return (
            <div className="contato-card contato-card--editing">
                <form onSubmit={handleSave} className="edit-form">

                    {/* Seção: Dados Pessoais */}
                    <div className="edit-form__section">
                        <div className="edit-form__section-title">📋 Dados Pessoais</div>

                        <div className="edit-form__row edit-form__row--full">
                            <div className="edit-form__group">
                                <label className="edit-form__label edit-form__label--required">Nome</label>
                                <input
                                    type="text"
                                    value={editData.nome}
                                    onChange={(e) => setEditData(prev => ({ ...prev, nome: e.target.value }))}
                                    placeholder="Nome completo"
                                    className="edit-form__input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="edit-form__row">
                            <div className="edit-form__group">
                                <label className="edit-form__label edit-form__label--required">Telefone</label>
                                <input
                                    type="tel"
                                    value={phoneMask.phone}
                                    onChange={(e) => phoneMask.handleChange(e)}
                                    placeholder="(11) 99999-9999"
                                    className="edit-form__input"
                                    maxLength={15}
                                    required
                                />
                            </div>

                            <div className="edit-form__group">
                                <label className="edit-form__label">Aniversário</label>
                                <input
                                    type="text"
                                    value={dateMask.date}
                                    onChange={(e) => dateMask.handleChange(e)}
                                    placeholder="dd/mm/aaaa"
                                    className="edit-form__input"
                                    maxLength={10}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Seção: Endereço */}
                    {/* Logradouro e Número na mesma linha */}
                    <div className="edit-form__row">
                        <div className="edit-form__group flex-2">
                            <label className="edit-form__label">Logradouro</label>
                            <input
                                type="text"
                                value={editData.logradouro || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, logradouro: e.target.value }))}
                                placeholder="Rua, Av, Pç, etc."
                                className="edit-form__input"
                            />
                        </div>
                        <div className="edit-form__group flex-1">
                            <label className="edit-form__label">Número</label>
                            <input
                                type="text"
                                value={editData.numero || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, numero: e.target.value }))}
                                placeholder="123"
                                className="edit-form__input"
                            />
                        </div>
                    </div>

                    {/* Bairro e Complemento */}
                    <div className="edit-form__row">
                        <div className="edit-form__group">
                            <label className="edit-form__label">Bairro</label>
                            <input
                                type="text"
                                value={editData.bairro || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, bairro: e.target.value }))}
                                placeholder="Bairro"
                                className="edit-form__input"
                            />
                        </div>
                        <div className="edit-form__group">
                            <label className="edit-form__label">Complemento</label>
                            <input
                                type="text"
                                value={editData.complemento || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, complemento: e.target.value }))}
                                placeholder="Apto, bloco, etc."
                                className="edit-form__input"
                            />
                        </div>
                    </div>

                    {/* CEP, Cidade, Estado */}
                    <div className="edit-form__row">
                        <div className="edit-form__group">
                            <label className="edit-form__label">CEP {cepHook.loading && '⏳'}</label>
                            <input
                                type="text"
                                value={cepHook.cep}
                                onChange={cepHook.handleChange}
                                onBlur={() => cepHook.handleBlur(handleCEPAutoFill)}
                                placeholder="00000-000"
                                className="edit-form__input"
                                maxLength={9}
                            />
                            {cepHook.error && (
                                <span className="edit-form__error" style={{ color: 'red', fontSize: '0.75rem' }}>
                                    {cepHook.error}
                                </span>
                            )}
                        </div>

                        <div className="edit-form__group">
                            <label className="edit-form__label">Cidade</label>
                            <input
                                type="text"
                                value={editData.cidade || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, cidade: e.target.value }))}
                                placeholder="Cidade"
                                className="edit-form__input"
                            />
                        </div>

                        <div className="edit-form__group">
                            <label className="edit-form__label">Estado</label>
                            <input
                                type="text"
                                value={editData.estado || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, estado: e.target.value.toUpperCase() }))}
                                placeholder="UF"
                                className="edit-form__input"
                                maxLength={2}
                            />
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    < div className="edit-form__actions" >
                        <Button type="button" variant="secondary" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="success">
                            💾 Salvar
                        </Button>
                    </div >
                </form >
            </div >
        );
    }

    // MODO DE VISUALIZAÇÃO
    return (
        <div className="contato-card">
            <div className="contato-card__info">
                <h3 className="contato-card__name">{contato.nome}</h3>
                {/* ✅ TELEFONE FORMATADO COM UTILITÁRIO GLOBAL */}
                <div className="contato-card__item">
                    📞 {formatPhoneBR(contato.telefone) || 'Sem telefone'}
                </div>

                {/* ✅ Aniversário formatado com utilitário */}
                {contato.aniversario && (
                    <div className="contato-card__item">
                        🎂 {formatDateBR(contato.aniversario)}
                    </div>
                )}

                {/* Endereço formatado com separadores */}
                {(contato.logradouro || contato.numero || contato.cidade) && (
                    <div className="contato-card__item">
                        📍
                        {/* Logradouro + Número com vírgula */}
                        {contato.logradouro && <span>{expandLogradouro(contato.logradouro)}</span>}
                        {contato.logradouro && contato.numero && <span>, </span>}
                        {contato.numero && <span>{contato.numero}</span>}

                        {/* Bairro com separador */}
                        {contato.bairro && (
                            <>
                                {(contato.logradouro || contato.numero) && <span> - </span>}
                                <span>{contato.bairro}</span>
                            </>
                        )}

                        {/* Complemento com separador */}
                        {contato.complemento && (
                            <>
                                <span> - </span>
                                <span>{contato.complemento}</span>
                            </>
                        )}

                        {/* Cidade/Estado com separador */}
                        {contato.cidade && (
                            <>
                                <span> - </span>
                                <span>
                                    {contato.cidade}
                                    {contato.estado && `/${contato.estado}`}
                                </span>
                            </>
                        )}

                        {/* CEP com separador */}
                        {contato.cep && (
                            <>
                                <span> - </span>
                                <span>CEP: {formatCEP(contato.cep)}</span>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="contato-card__actions">
                <Button variant="primary" onClick={handleEdit} title="Editar">✏️</Button>
                <Button variant="danger" onClick={() => onDelete(contato.idcontato)} title="Excluir">🗑️</Button>
            </div>
        </div>
    );
}