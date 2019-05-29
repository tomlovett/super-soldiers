export const displayName = (s) => s.nickname ? s.nickname : `${s.first_name} ${s.last_name}`

export const fullName = (s) => s.nickname ? `${s.first_name} "${s.nickname}" ${s.last_name}` : `${s.first_name} ${s.last_name}`
