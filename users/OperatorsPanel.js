// Este componente maneja la lista de operadores y el modal para crear nuevos
window.OperatorsPanel = function(props) {
    const { ops, onDeleteOp, onAddOp, Icons } = props;
    
    // Estados locales transferidos desde el App principal
    const [showStaffModal, setShowStaffModal] = React.useState(false);
    const [staffForm, setStaffForm] = React.useState({ u: '', p: '', n: '' });

    const handleSave = (e) => {
        e.preventDefault();
        const newOp = { 
            ...staffForm, 
            id: staffForm.u, 
            role: 'operador', 
            pass: staffForm.p, 
            name: staffForm.n 
        };
        onAddOp(newOp);
        setShowStaffModal(false);
        setStaffForm({ u: '', p: '', n: '' }); // Limpiar formulario
    };

    return (
        <div className="card-glass overflow-hidden relative">
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex justify-between items-center">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Operadores Registrados</h2>
                {/* Botón movido aquí para encapsular la lógica del componente */}
                <button onClick={() => setShowStaffModal(true)} className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.65rem' }}>
                    + Registrar Operador
                </button>
            </div>
            <table className="w-full text-left">
                <thead className="bg-white border-b border-slate-50">
                    <tr className="text-[8px] font-black uppercase text-slate-400">
                        <th className="px-6 py-3">Nombre</th>
                        <th className="px-6 py-3">Usuario</th>
                        <th className="px-6 py-3 text-right">Acción</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {ops.filter(o => o.role === 'operador').map(o => (
                        <tr key={o.id} className="text-[10px] font-bold text-slate-600">
                            <td className="px-6 py-4">{o.name}</td>
                            <td className="px-6 py-4 font-mono text-slate-400">{o.id}</td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => onDeleteOp(o.id)} className="text-slate-300 hover:text-red-500">
                                    <Icons.Trash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Registro de Staff */}
            {showStaffModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                    <div className="card-glass max-w-sm w-full p-10 animate-slide">
                        <h2 className="text-sm font-black text-center uppercase mb-8">Nuevo Operador</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <input required className="input-field" placeholder="NOMBRE COMPLETO" value={staffForm.n} onChange={e => setStaffForm({...staffForm, n: e.target.value})} />
                            <input required className="input-field uppercase" placeholder="ID (EJ: OP-01)" value={staffForm.u} onChange={e => setStaffForm({...staffForm, u: e.target.value})} />
                            <input required className="input-field" placeholder="CONTRASEÑA" value={staffForm.p} onChange={e => setStaffForm({...staffForm, p: e.target.value})} />
                            <button type="submit" className="w-full btn-primary h-12">Guardar Registro</button>
                            <button type="button" onClick={() => setShowStaffModal(false)} className="w-full text-[9px] font-black text-slate-400 uppercase">Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};