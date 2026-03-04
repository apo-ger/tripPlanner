// ABOUTME: "Georgian Editorial" design tokens — light theme palette.
// ABOUTME: Colors, priority badges, and status labels for the trip planner UI.

export const colors = {
  bg: {
    deep: '#FAFAF8',
    mid: '#F5F4F1',
    surface: '#FFFFFF',
  },
  card: {
    bg: '#FFFFFF',
    bgExpanded: '#FFFFFF',
  },
  text: {
    primary: '#1A1612',
    secondary: '#5C554D',
    muted: '#8A847C',
    subtle: '#B0AAA2',
    ghost: '#D4D0CB',
  },
  accent: {
    kutaisi: { from: '#B85A2B', to: '#944820' },
    drive: { from: '#A88428', to: '#86691E' },
    gudauri: { from: '#2E6E8A', to: '#1E5068' },
    tbilisi: { from: '#7A5B8C', to: '#5E4370' },
  },
  status: {
    done: '#3D8A50',
    pending: '#8A847C',
  },
  badge: {
    must: { bg: '#C2442E', text: '#fff' },
    rec: { bg: '#B85A2B', text: '#fff' },
    opt: { bg: '#E8E5E0', text: '#5C554D' },
    check: { bg: '#D44A3A', text: '#fff' },
    info: { bg: '#2E6E8A', text: '#fff' },
    tbd: { bg: '#E8E5E0', text: '#8A847C' },
  },
}

export const priorityConfig = {
  must: { label: 'MUST DO', bg: colors.badge.must.bg, color: colors.badge.must.text },
  rec: { label: "REC'D", bg: colors.badge.rec.bg, color: colors.badge.rec.text },
  opt: { label: 'OPTIONAL', bg: colors.badge.opt.bg, color: colors.badge.opt.text },
  check: { label: '⚠ CHECK', bg: colors.badge.check.bg, color: colors.badge.check.text },
  info: { label: 'INFO', bg: colors.badge.info.bg, color: colors.badge.info.text },
  tbd: { label: 'TBD', bg: colors.badge.tbd.bg, color: colors.badge.tbd.text },
}

export const statusLabels = {
  researched: { label: 'Researched', color: colors.status.done },
  'not-started': { label: 'Not Started', color: colors.status.pending },
}
