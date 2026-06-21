window.ControlPanel = function(props) {
    const { pkgs, ops, saveDoc, deletePkg, deleteOp, handleAddOp, Icons } = props;
    
    const [pkgForm, setPkgForm] = React.useState({ id: '', o: '', d: '', op: '' });

    const handleCreatePkg = (e) => {
        e.preventDefault(); 
        const newPkg = { 
            ...pkgForm, 
            id: pkgForm.id.toUpperCase(), 
            status: 'Recolectado', 
            currentStep: 0 
        }; 
        saveDoc('packages', newPkg.id, newPkg); 
        setPkgForm({ id: '', o: '', d: '', op: '' }); 
    };

    return (
        <div className="w-full max-w-5xl space-y-8 animate-slide">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black">Panel <span className="text-red-500">Admin</span></h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Gestión Central</p>
                </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 card-glass p-6 space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nuevo Envío</h2>
                    <form onSubmit={handleCreatePkg} className="space-y-4">
                        <input required className="input-field uppercase" placeholder="NÚMERO DE GUÍA" value={pkgForm.id} onChange={e => setPkgForm({...pkgForm, id: e.target.value})} />
                        <input required className="input-field uppercase" placeholder="ORIGEN" value={pkgForm.o} onChange={e => setPkgForm({...pkgForm, o: e.target.value})} />
                        <input required className="input-field uppercase" placeholder="DESTINO" value={pkgForm.d} onChange={e => setPkgForm({...pkgForm, d: e.target.value})} />
                        <select required className="input-field" value={pkgForm.op} onChange={e => setPkgForm({...pkgForm, op: e.target.value})}>
                            <option value="">ASIGNAR OPERADOR</option>
                            {/* Ahora la clave de asignación es el correo electrónico del operador */}
                            {ops.filter(o => o.role === 'operador').map(o => <option key={o.email} value={o.email}>{o.name}</option>)}
                        </select>
                        <button type="submit" className="w-full btn-primary h-12">Crear Guía</button>
                    </form>
                </div>
                
                <div className="md:col-span-2 space-y-8">
                    <div className="card-glass overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Envíos Activos</h2>
                        </div>
                        <table className="w-full text-left">
                            <tbody className="divide-y divide-slate-50">
                                {pkgs.map(p => (
                                    <tr key={p.id} className="text-[10px] font-bold text-slate-600">
                                        <td className="px-6 py-4 text-red-600 font-black">#{p.id}</td>
                                        <td className="px-6 py-4">{p.o} → {p.d}</td>
                                        <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 rounded-full text-[8px] uppercase">{p.status}</span></td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => deletePkg(p.id)} className="text-slate-300 hover:text-red-500">
                                                <Icons.Trash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Llamada al panel de operadores conectada a la autenticación segura */}
                    {window.OperatorsPanel && (
                        <window.OperatorsPanel 
                            ops={ops} 
                            onDeleteOp={deleteOp} 
                            onAddOp={handleAddOp} 
                            Icons={Icons} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
