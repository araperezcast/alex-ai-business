import { Users } from "lucide-react";

export function PortalUserManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-3 font-serif text-3xl font-bold text-[#16305C]">
          <Users className="h-7 w-7" />
          Directorio Global de Usuarios
        </h2>
        <p className="mt-1.5 text-[15px] text-[#7A8494]">
          Administra el nivel de acceso (rol) y la agencia a la que pertenece cada miembro.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#EDE7DE] bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#F1EDE6] text-[13px] font-semibold text-[#7A8494]">
              <th className="px-7 py-4">Usuario</th>
              <th className="px-7 py-4">Compañía / Agencia</th>
              <th className="px-7 py-4">Nivel de Acceso</th>
              <th className="px-7 py-4">Estado</th>
              <th className="px-7 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-7 py-10 text-center text-[14px] text-[#9AA3B2]">
                No hay usuarios registrados.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
