import { useMemo, useState, type ReactNode } from 'react'

type ModuleKey =
  | 'dashboard'
  | 'communities'
  | 'visits'
  | 'resources'
  | 'workshops'
  | 'team'
  | 'beneficiaries'
  | 'reports'
  | 'validation'
  | 'settings'

type IconName =
  | 'grid'
  | 'map'
  | 'calendar'
  | 'box'
  | 'book'
  | 'users'
  | 'student'
  | 'chart'
  | 'check'
  | 'settings'
  | 'search'
  | 'bell'
  | 'plus'
  | 'arrow'
  | 'clock'
  | 'truck'
  | 'menu'
  | 'close'

const icons: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></>,
  box: <><path d="m21 8-9 5-9-5 9-5 9 5Z"/><path d="m3 8 9 5 9-5v9l-9 5-9-5V8ZM12 13v9"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M8 7h8M8 11h6"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  student: <><path d="m2 10 10-5 10 5-10 5L2 10Z"/><path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6"/></>,
  chart: <><path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-7"/></>,
  check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2.83 2.83-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21h-4v-.17a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06-2.83-2.83.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3v-4h.17a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06 2.83-2.83.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3h4v.17a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06 2.83 2.83-.06.06A1.65 1.65 0 0 0 19.4 9c.12.6.6 1.08 1.2 1.2H21v4h-.17c-.67 0-1.27.4-1.51 1Z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  arrow: <path d="m9 18 6-6-6-6"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
}

function Icon({ name, size = 19 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{icons[name]}</svg>
}

const nav: { key: ModuleKey; label: string; icon: IconName }[] = [
  { key: 'dashboard', label: 'Panel principal', icon: 'grid' },
  { key: 'communities', label: 'Comunidades rurales', icon: 'map' },
  { key: 'visits', label: 'Planificación de visitas', icon: 'calendar' },
  { key: 'resources', label: 'Recursos e inventario', icon: 'box' },
  { key: 'workshops', label: 'Talleres educativos', icon: 'book' },
  { key: 'team', label: 'Docentes y voluntarios', icon: 'users' },
  { key: 'beneficiaries', label: 'Beneficiarios', icon: 'student' },
  { key: 'reports', label: 'Reportes', icon: 'chart' },
  { key: 'validation', label: 'Validación del prototipo', icon: 'check' },
  { key: 'settings', label: 'Configuración', icon: 'settings' },
]

const titles: Record<ModuleKey, { title: string; desc: string; action?: string }> = {
  dashboard: { title: 'Panel principal', desc: 'Resumen operativo del programa educativo', action: 'Programar visita' },
  communities: { title: 'Comunidades rurales', desc: 'Instituciones y comunidades beneficiarias', action: 'Registrar comunidad' },
  visits: { title: 'Planificación de visitas', desc: 'Agenda del Aula Móvil Educativa', action: 'Programar visita' },
  resources: { title: 'Recursos e inventario', desc: 'Disponibilidad de materiales y equipamiento', action: 'Añadir recurso' },
  workshops: { title: 'Talleres educativos', desc: 'Catálogo de experiencias de aprendizaje', action: 'Programar taller' },
  team: { title: 'Docentes y voluntarios', desc: 'Equipo educativo y disponibilidad', action: 'Añadir integrante' },
  beneficiaries: { title: 'Beneficiarios', desc: 'Participación agregada y protegida', action: 'Registrar participación' },
  reports: { title: 'Reportes', desc: 'Indicadores de impacto del programa', action: 'Exportar vista' },
  validation: { title: 'Validación del prototipo', desc: 'Registro de aprendizajes y mejoras', action: 'Nueva evaluación' },
  settings: { title: 'Configuración', desc: 'Preferencias generales del proyecto', action: 'Guardar cambios' },
}

function Button({ children, kind = 'primary', onClick }: { children: ReactNode; kind?: 'primary' | 'secondary' | 'ghost'; onClick?: () => void }) {
  return <button className={`btn ${kind}`} onClick={onClick}>{children}</button>
}

function Badge({ children, tone = 'blue' }: { children: ReactNode; tone?: 'blue' | 'green' | 'amber' | 'purple' | 'gray' }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>
}

const stats = [
  { label: 'Comunidades atendidas', value: '24', delta: '+3 este mes', icon: 'map' as IconName, tone: 'navy' },
  { label: 'Estudiantes beneficiarios', value: '1,248', delta: '+12% vs. periodo anterior', icon: 'student' as IconName, tone: 'purple' },
  { label: 'Talleres programados', value: '18', delta: '7 en los próximos 15 días', icon: 'book' as IconName, tone: 'green' },
  { label: 'Recursos disponibles', value: '87%', delta: '4 alertas de existencias', icon: 'box' as IconName, tone: 'amber' },
]

const visits = [
  { date: '18 JUN', community: 'Santa Rosa de Quives', workshop: 'Ciencias experimentales', time: '09:00 – 13:00', status: 'Confirmada' },
  { date: '21 JUN', community: 'San Pedro de Casta', workshop: 'Robótica sin conexión', time: '10:00 – 14:00', status: 'Programada' },
  { date: '26 JUN', community: 'Laraos', workshop: 'Matemáticas prácticas', time: '08:30 – 12:30', status: 'Programada' },
]

function Dashboard({ go, open }: { go: (m: ModuleKey) => void; open: (t: string) => void }) {
  return <div className="stack">
    <div className="demo-note"><Icon name="check" size={16}/><span><strong>Entorno de demostración.</strong> Los datos son ficticios y se muestran con fines académicos.</span></div>
    <div className="stat-grid">
      {stats.map(s => <Card className="stat-card" key={s.label}><div className={`stat-icon ${s.tone}`}><Icon name={s.icon}/></div><div><p className="muted">{s.label}</p><strong className="stat-value">{s.value}</strong><p className="delta">{s.delta}</p></div></Card>)}
    </div>
    <div className="dashboard-grid">
      <Card className="span-2">
        <div className="card-head"><div><h2>Próximas visitas</h2><p className="muted">Ruta del Aula Móvil</p></div><Button kind="ghost" onClick={() => go('visits')}>Ver calendario <Icon name="arrow" size={16}/></Button></div>
        <div className="visit-list">{visits.map((v, i) => <button className="visit-row" key={v.community} onClick={() => open(`Visita a ${v.community}`)}><span className="date-tile">{v.date.split(' ')[0]}<small>{v.date.split(' ')[1]}</small></span><span className="visit-main"><strong>{v.community}</strong><small>{v.workshop}</small></span><span className="visit-time"><Icon name="clock" size={15}/>{v.time}</span><Badge tone={i === 0 ? 'green' : 'blue'}>{v.status}</Badge><Icon name="arrow" size={16}/></button>)}</div>
      </Card>
      <Card>
        <div className="card-head"><div><h2>Talleres por categoría</h2><p className="muted">Últimos 30 días</p></div><span className="select-pill">Junio</span></div>
        <div className="donut-wrap"><div className="donut"><span>42<small>talleres</small></span></div><div className="legend"><span><i className="dot purple"/>Ciencias <b>32%</b></span><span><i className="dot blue"/>Tecnología <b>27%</b></span><span><i className="dot green"/>Sostenibilidad <b>23%</b></span><span><i className="dot amber"/>Otros <b>18%</b></span></div></div>
      </Card>
      <Card className="span-2">
        <div className="card-head"><div><h2>Actividad de junio</h2><p className="muted">Visitas programadas y realizadas</p></div><Badge tone="purple">12 actividades</Badge></div>
        <div className="calendar">
          {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d => <b key={d}>{d}</b>)}
          {[...Array(35)].map((_, i) => <button className={i === 17 ? 'today event' : [10,20,25].includes(i) ? 'event' : ''} key={i}>{i < 2 ? '' : i - 1}</button>)}
        </div>
      </Card>
      <Card>
        <div className="card-head"><div><h2>Disponibilidad</h2><p className="muted">Recursos críticos</p></div><Button kind="ghost" onClick={() => go('resources')}>Inventario</Button></div>
        <div className="progress-list">{[['Kits educativos',92],['Tablets sin conexión',78],['Materiales de arte',61],['Combustible',44]].map(([label,val]) => <div key={label as string}><span><b>{label}</b><em>{val}%</em></span><div className="progress"><i style={{width: `${val}%`}} className={Number(val) < 50 ? 'low' : ''}/></div></div>)}</div>
      </Card>
    </div>
    <div className="quick-actions"><div><h2>Acciones rápidas</h2><p className="muted">Tareas frecuentes del equipo</p></div>{[['map','Registrar comunidad','communities'],['calendar','Programar visita','visits'],['box','Añadir recurso','resources']].map(a => <button key={a[1]} onClick={() => go(a[2] as ModuleKey)}><span><Icon name={a[0] as IconName}/></span>{a[1]}<Icon name="arrow" size={16}/></button>)}</div>
  </div>
}

const communityRows = [
  ['Santa Rosa de Quives','Canta, Lima','IE 20268','86','Materiales STEM','Alta','En atención'],
  ['San Pedro de Casta','Huarochirí, Lima','IE 20546','112','Tecnología offline','Alta','Programada'],
  ['Laraos','Yauyos, Lima','IE 20732','64','Comprensión lectora','Media','Atendida'],
  ['Huancaya','Yauyos, Lima','IE 20758','48','Kits experimentales','Media','En evaluación'],
]

function Communities({ open }: { open: (t: string) => void }) {
  return <div className="stack"><div className="filters"><div className="search-box wide"><Icon name="search" size={17}/><input placeholder="Buscar comunidad o institución…"/></div><select><option>Todos los distritos</option></select><select><option>Prioridad</option></select><select><option>Estado</option></select></div>
    <Card><div className="card-head"><div><h2>Comunidades registradas</h2><p className="muted">24 comunidades · Datos de demostración</p></div></div><div className="table-wrap"><table><thead><tr>{['Comunidad','Ubicación','Institución','Estudiantes','Necesidad principal','Prioridad','Estado'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{communityRows.map((r,i) => <tr key={r[0]} onClick={() => open(`Ficha de ${r[0]}`)}>{r.map((c,j) => <td key={c}>{j === 0 ? <strong>{c}</strong> : j === 5 ? <Badge tone={i < 2 ? 'amber' : 'blue'}>{c}</Badge> : j === 6 ? <Badge tone={i === 2 ? 'green' : i === 3 ? 'gray' : 'purple'}>{c}</Badge> : c}</td>)}</tr>)}</tbody></table></div></Card>
  </div>
}

function Visits({ open }: { open: (t: string) => void }) {
  const days = Array.from({length: 35}, (_, i) => i < 5 ? null : i - 4)
  return <div className="stack"><div className="toolbar"><div className="segmented"><button className="active">Mes</button><button>Semana</button></div><div className="month-switch"><button>‹</button><strong>Junio 2025</strong><button>›</button></div><div className="legend-inline"><Badge tone="blue">Programada</Badge><Badge tone="green">Confirmada</Badge><Badge tone="purple">Realizada</Badge></div></div>
    <Card className="schedule-card"><div className="schedule-head">{['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'].map(d => <b key={d}>{d}</b>)}</div><div className="schedule-grid">{days.map((d,i) => <div className="day" key={i}><span>{d}</span>{d === 4 && <button className="schedule-event purple" onClick={() => open('Visita a Laraos')}><b>09:00</b> Laraos<small>Matemáticas</small></button>}{d === 11 && <button className="schedule-event green" onClick={() => open('Visita a Santa Rosa de Quives')}><b>09:00</b> Santa Rosa<small>Ciencias</small></button>}{d === 18 && <button className="schedule-event blue" onClick={() => open('Visita a San Pedro de Casta')}><b>10:00</b> San Pedro<small>Robótica</small></button>}{d === 26 && <button className="schedule-event blue" onClick={() => open('Visita a Huancaya')}><b>08:30</b> Huancaya<small>Creatividad</small></button>}</div>)}</div></Card>
  </div>
}

const resources = [
  ['MAT-001','Kits de ciencias','Material educativo','28','Disponible','Almacén central','green'],
  ['TEC-014','Tablets offline','Tecnología','18','Disponible','Aula móvil','green'],
  ['TEC-022','Proyector portátil','Tecnología','2','Mantenimiento','Taller técnico','amber'],
  ['MAT-036','Materiales de arte','Material educativo','8','Existencia baja','Almacén central','amber'],
  ['LOG-003','Combustible','Logística','44%','Existencia baja','Aula móvil','amber'],
]

function Resources({ open }: { open: (t: string) => void }) {
  return <div className="stack">
    <div className="category-grid">{[['book','Materiales educativos','126 unidades','purple'],['grid','Recursos tecnológicos','34 equipos','blue'],['users','Recursos humanos','18 personas','green'],['truck','Recursos logísticos','12 recursos','amber']].map(c => <button key={c[1]} className="category-card"><span className={`stat-icon ${c[3]}`}><Icon name={c[0] as IconName}/></span><span><strong>{c[1]}</strong><small>{c[2]}</small></span><Icon name="arrow" size={17}/></button>)}</div>
    <div className="filters"><div className="search-box wide"><Icon name="search" size={17}/><input placeholder="Buscar por código o recurso…"/></div><select><option>Todas las categorías</option></select><select><option>Todos los estados</option></select><Button kind="secondary" onClick={() => open('Registrar salida de recurso')}>Registrar salida</Button></div>
    <Card><div className="card-head"><div><h2>Inventario general</h2><p className="muted">188 unidades registradas · 4 alertas activas</p></div><Badge tone="gray">Actualizado: hoy, 08:30</Badge></div><div className="table-wrap"><table><thead><tr>{['Código','Recurso','Categoría','Disponible','Estado','Ubicación','Acciones'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{resources.map(r => <tr key={r[0]}><td><code>{r[0]}</code></td><td><strong>{r[1]}</strong></td><td>{r[2]}</td><td><b>{r[3]}</b></td><td><Badge tone={r[6] as 'green'|'amber'}>{r[4]}</Badge></td><td>{r[5]}</td><td><button className="text-button" onClick={() => open(`Detalle de ${r[1]}`)}>Ver detalle</button></td></tr>)}</tbody></table></div><div className="prototype-note">Las acciones de inventario son una simulación del prototipo y no modifican cantidades de forma persistente.</div></Card>
  </div>
}

const workshops = [
  ['Matemáticas en el mercado','Matemáticas prácticas','8–12 años','90 min','purple','Aprender operaciones y presupuesto con situaciones cotidianas.'],
  ['Laboratorio en una caja','Ciencias experimentales','10–14 años','120 min','blue','Explorar reacciones y principios físicos con materiales seguros.'],
  ['Robótica sin conexión','Robótica educativa','11–16 años','120 min','green','Desarrollar pensamiento lógico programando secuencias offline.'],
  ['Diseña tu comunidad','Creatividad y diseño','9–15 años','90 min','amber','Proponer soluciones para retos del entorno mediante prototipos.'],
  ['Transformar para cuidar','Reciclaje y sostenibilidad','8–15 años','75 min','green','Convertir residuos limpios en objetos útiles para la comunidad.'],
  ['Desafíos de lógica','Tecnología y pensamiento lógico','10–16 años','90 min','blue','Resolver problemas colaborativos sin necesidad de internet.'],
]

function Workshops({ open }: { open: (t: string) => void }) {
  return <div className="stack"><div className="filters"><div className="search-box wide"><Icon name="search" size={17}/><input placeholder="Buscar taller…"/></div><select><option>Todas las categorías</option></select><select><option>Todas las edades</option></select></div><div className="workshop-grid">{workshops.map((w,i) => <Card className="workshop-card" key={w[0]}><div className={`workshop-art ${w[4]}`}><Icon name={i % 2 ? 'grid' : 'book'} size={34}/><span>Modalidad presencial · Sin internet</span></div><div className="workshop-body"><Badge tone={w[4] as 'purple'|'blue'|'green'|'amber'}>{w[1]}</Badge><h2>{w[0]}</h2><p>{w[5]}</p><div className="meta"><span><Icon name="users" size={16}/>{w[2]}</span><span><Icon name="clock" size={16}/>{w[3]}</span></div><Button kind="secondary" onClick={() => open(w[0])}>Ver ficha del taller <Icon name="arrow" size={16}/></Button></div></Card>)}</div></div>
}

function Validation({ open }: { open: (t: string) => void }) {
  return <div className="stack"><div className="validation-hero"><div><Badge tone="purple">Actividad académica</Badge><h2>Validar para mejorar la propuesta</h2><p>Registra lo que las personas evaluadoras comprendieron y convierte sus observaciones en decisiones concretas de diseño.</p></div><div className="validation-score"><strong>3</strong><span>evaluaciones<br/>de ejemplo</span></div></div>
    <div className="validation-grid"><Card><div className="card-head"><div><h2>Registrar evaluación</h2><p className="muted">Todos los campos corresponden a una simulación</p></div></div><div className="form-grid"><label>Código del equipo<input placeholder="Ej. EQ-04"/></label><label>Fecha de evaluación<input type="date" defaultValue="2025-06-18"/></label><label className="full">¿Qué entendieron del proyecto?<textarea placeholder="Describe la comprensión de la propuesta…"/></label><label className="full">¿Qué les gustó?<textarea placeholder="Funciones o características destacadas…"/></label><label className="full">¿Qué mejorarían?<textarea placeholder="Oportunidades de mejora…"/></label></div><div className="form-actions"><Button kind="secondary">Cancelar</Button><Button onClick={() => open('Evaluación registrada')}>Guardar como demostración</Button></div></Card>
    <div className="stack compact"><Card><h2>Resultados de ejemplo</h2><p className="muted">No representan una evaluación real.</p><div className="insight-list"><div><span className="insight-icon green"><Icon name="check"/></span><p><b>Comprensión</b><small>Se reconoce el aula móvil como una solución educativa itinerante y offline.</small></p></div><div><span className="insight-icon purple"><Icon name="book"/></span><p><b>Aspectos positivos</b><small>La planificación visual y el control de recursos se perciben como útiles.</small></p></div><div><span className="insight-icon amber"><Icon name="chart"/></span><p><b>Oportunidad</b><small>Hacer más visible el estado de existencias antes de programar una visita.</small></p></div></div></Card></div></div>
    <Card><div className="card-head"><div><h2>Mejora implementada</h2><p className="muted">Comparación conceptual · Ejemplo de iteración</p></div><Badge tone="green">Iteración 02</Badge></div><div className="comparison"><div className="before"><span>Prototipo inicial</span><div className="mini-ui"><i/><i/><i/><i/></div><p>El inventario solo mostraba cantidades, sin anticipar riesgos operativos.</p></div><div className="compare-arrow">→</div><div className="after"><span>Prototipo mejorado</span><div className="mini-ui improved"><i/><i/><i/><i/></div><p>Se añadieron alertas, estados y disponibilidad visible para tomar decisiones.</p></div></div><div className="improvement-row">{[['Observación recibida','“No sé si hay materiales suficientes.”'],['Problema identificado','Baja visibilidad de existencias críticas.'],['Cambio aplicado','Indicadores y alertas por recurso.'],['Resultado esperado','Planificación con menos imprevistos.']].map(x => <div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b></div>)}</div></Card>
  </div>
}

function GenericModule({ type, open }: { type: ModuleKey; open: (t: string) => void }) {
  if (type === 'team') return <div className="stack"><div className="filters"><div className="search-box wide"><Icon name="search" size={17}/><input placeholder="Buscar integrante…"/></div><select><option>Todas las especialidades</option></select><select><option>Disponibilidad</option></select></div><div className="people-grid">{[['LM','Lucía M.','Docente','Ciencias · Disponible'],['CR','Carlos R.','Voluntario','Tecnología · Disponible'],['AV','Andrea V.','Coordinadora','Gestión · En ruta'],['JP','José P.','Docente','Matemáticas · Disponible']].map((p,i) => <Card className="person" key={p[0]}><span className={`avatar large a${i}`}>{p[0]}</span><h2>{p[1]}</h2><Badge tone={i === 2 ? 'purple' : 'green'}>{p[2]}</Badge><p>{p[3]}</p><Button kind="secondary" onClick={() => open(`Perfil de ${p[1]}`)}>Ver perfil</Button></Card>)}</div></div>
  if (type === 'beneficiaries') return <div className="stack"><div className="privacy-note"><Icon name="check"/><div><strong>Privacidad por diseño</strong><p>Esta vista utiliza códigos ficticios y datos agregados. No se muestran nombres, documentos ni direcciones de menores.</p></div></div><div className="stat-grid small">{[['Participantes activos','1,248'],['Participación recurrente','68%'],['Grupos de edad','4'],['Comunidades','24']].map(s => <Card className="stat-card" key={s[0]}><div><p className="muted">{s[0]}</p><strong className="stat-value">{s[1]}</strong></div></Card>)}</div><Card><div className="card-head"><h2>Registro de participación</h2><Badge tone="gray">Datos ficticios</Badge></div><div className="table-wrap"><table><thead><tr>{['Código','Comunidad','Institución','Grupo de edad','Talleres','Última participación'].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{[['EST-0248','Laraos','IE 20732','10–12','3','12 jun 2025'],['EST-0316','Santa Rosa','IE 20268','8–10','2','18 jun 2025'],['EST-0521','San Pedro','IE 20546','13–16','4','04 jun 2025']].map(r=><tr key={r[0]}>{r.map(c=><td key={c}>{c}</td>)}</tr>)}</tbody></table></div></Card></div>
  if (type === 'reports') return <div className="stack"><div className="filters"><select><option>Últimos 6 meses</option></select><select><option>Todas las comunidades</option></select><select><option>Todas las categorías</option></select><span className="prototype-note inline">La exportación es solo visual en este prototipo.</span></div><div className="report-grid"><Card className="span-2"><div className="card-head"><div><h2>Participantes por mes</h2><p className="muted">Total acumulado: 1,248</p></div><Badge tone="green">+12%</Badge></div><div className="bar-chart">{[42,55,48,70,82,66].map((v,i)=><div key={i}><span style={{height:`${v}%`}}/><small>{['Ene','Feb','Mar','Abr','May','Jun'][i]}</small></div>)}</div></Card><Card><h2>Visitas</h2><div className="donut-wrap vertical"><div className="donut report"><span>84%<small>realizadas</small></span></div><p className="muted center">37 realizadas de 44 programadas</p></div></Card><Card><h2>Impacto acumulado</h2><div className="big-metric">24<small>comunidades</small></div><div className="big-metric purple-text">126<small>talleres realizados</small></div></Card><Card className="span-2"><h2>Distribución de actividades</h2><div className="horizontal-bars">{[['Ciencias',84],['Tecnología',72],['Matemáticas',64],['Sostenibilidad',48],['Creatividad',38]].map(x=><div key={x[0]}><b>{x[0]}</b><span><i style={{width:`${x[1]}%`}}/></span><em>{x[1]}</em></div>)}</div></Card></div></div>
  return <div className="stack"><Card><div className="settings-section"><h2>Información general</h2><div className="form-grid"><label>Nombre del emprendimiento<input defaultValue="EduMóvil Rural"/></label><label>Tipo de organización<input defaultValue="Emprendimiento social educativo"/></label><label className="full">Propósito<textarea defaultValue="Acercar experiencias educativas prácticas y sin conexión a comunidades rurales."/></label></div></div><div className="settings-section"><h2>Preferencias de visualización</h2><div className="setting-row"><div><b>Vista compacta</b><p>Reduce el espaciado de tablas y tarjetas.</p></div><button className="toggle" aria-label="Activar vista compacta"><i/></button></div><div className="setting-row"><div><b>Mostrar datos de demostración</b><p>Identifica el contenido ficticio en cada módulo.</p></div><button className="toggle on" aria-label="Mostrar datos de demostración"><i/></button></div></div></Card></div>
}

function Modal({ title, close, go }: { title: string; close: () => void; go: (m: ModuleKey) => void }) {
  const isForm = /Registrar|Añadir|Programar/.test(title)
  return <div className="modal-backdrop" onMouseDown={close}><div className="modal" onMouseDown={e => e.stopPropagation()}><div className="modal-head"><div><Badge tone="purple">Demostración</Badge><h2>{title}</h2></div><button className="icon-button" onClick={close} aria-label="Cerrar"><Icon name="close"/></button></div>
    {isForm ? <div className="form-grid"><label>Comunidad<select><option>Seleccionar comunidad</option><option>Santa Rosa de Quives</option></select></label><label>Responsable<select><option>Seleccionar responsable</option><option>Lucía M. — Ciencias</option></select></label><label>Fecha<input type="date"/></label><label>Horario<input type="time"/></label><label className="full">Taller o actividad<select><option>Seleccionar actividad</option><option>Ciencias experimentales</option><option>Robótica sin conexión</option></select></label><label className="full">Observaciones<textarea placeholder="Añade información relevante…"/></label></div> : <div className="detail-body"><div className="detail-banner"><span className="stat-icon purple"><Icon name="map"/></span><div><small>Actividad planificada</small><strong>{title}</strong></div><Badge tone="green">Confirmada</Badge></div><div className="detail-grid"><div><small>Fecha y horario</small><b>18 de junio · 09:00–13:00</b></div><div><small>Responsable</small><b>Lucía M. · Docente</b></div><div><small>Taller</small><b>Ciencias experimentales</b></div><div><small>Recursos</small><b>6 kits · 12 tablets offline</b></div></div><div className="prototype-note">Ficha con información ficticia para demostrar el flujo del prototipo.</div></div>}
    <div className="form-actions"><Button kind="secondary" onClick={close}>Cancelar</Button>{/taller/i.test(title) && <Button kind="secondary" onClick={() => {close();go('visits')}}>Programar taller</Button>}<Button onClick={close}>{isForm ? 'Confirmar simulación' : 'Cerrar ficha'}</Button></div></div></div>
}

export default function App() {
  const [active, setActive] = useState<ModuleKey>('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<string | null>(null)
  const meta = titles[active]
  const content = useMemo(() => {
    if (active === 'dashboard') return <Dashboard go={setActive} open={setModal}/>
    if (active === 'communities') return <Communities open={setModal}/>
    if (active === 'visits') return <Visits open={setModal}/>
    if (active === 'resources') return <Resources open={setModal}/>
    if (active === 'workshops') return <Workshops open={setModal}/>
    if (active === 'validation') return <Validation open={setModal}/>
    return <GenericModule type={active} open={setModal}/>
  }, [active])
  const navigate = (key: ModuleKey) => { setActive(key); setMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'}) }
  const primaryAction = () => {
    if (active === 'dashboard' || active === 'visits') setModal('Programar visita')
    else if (active === 'communities') setModal('Registrar comunidad')
    else if (active === 'resources') setModal('Añadir recurso')
    else if (active === 'workshops') setActive('visits')
    else if (active === 'validation') setModal('Registrar nueva evaluación')
    else setModal(meta.action || 'Acción')
  }
  return <div className="app-shell">
    <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><span className="brand-mark"><Icon name="book" size={24}/></span><div><strong>EduMóvil</strong><small>RURAL</small></div><button className="mobile-close" onClick={() => setMenuOpen(false)}><Icon name="close"/></button></div>
      <div className="program-label">GESTIÓN DEL PROGRAMA</div>
      <nav>{nav.map(n => <button className={active === n.key ? 'active' : ''} onClick={() => navigate(n.key)} key={n.key}><Icon name={n.icon}/><span>{n.label}</span>{active === n.key && <i/>}</button>)}</nav>
      <div className="sidebar-help"><span><Icon name="truck"/></span><strong>Aula móvil</strong><p>Operación activa · Junio 2025</p><Badge tone="green">En ruta</Badge></div>
      <div className="sidebar-user"><span className="avatar">AM</span><div><strong>Alex Martínez</strong><small>Coordinación general</small></div><Icon name="arrow" size={16}/></div>
    </aside>
    {menuOpen && <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"/>}
    <main>
      <header><div className="header-title"><button className="menu-button" onClick={() => setMenuOpen(true)}><Icon name="menu"/></button><div><h1>{meta.title}</h1><p>{meta.desc}</p></div></div><div className="header-actions"><div className="search-box"><Icon name="search" size={17}/><input placeholder="Buscar en EduMóvil…"/></div><button className="icon-button notification"><Icon name="bell"/><i/></button><Button onClick={primaryAction}><Icon name="plus" size={17}/>{meta.action}</Button></div></header>
      <div className="content">{content}</div>
    </main>
    <nav className="mobile-nav">{nav.slice(0,5).map(n => <button className={active === n.key ? 'active' : ''} onClick={() => navigate(n.key)} key={n.key}><Icon name={n.icon}/><span>{n.label.split(' ')[0]}</span></button>)}<button onClick={() => setMenuOpen(true)}><Icon name="menu"/><span>Más</span></button></nav>
    {modal && <Modal title={modal} close={() => setModal(null)} go={navigate}/>}
  </div>
}
