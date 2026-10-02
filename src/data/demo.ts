export type Severity = 'disaster' | 'high' | 'average' | 'warning' | 'information' | 'notClassified';

export interface DemoProblem {
  id: string;
  name: string;
  hosts: string[];
  severity: Severity;
  /** Há quanto tempo o problema começou (segundos): o início é calculado a partir de agora. */
  ageSeconds: number;
  duration: string;
  groups: string[];
  ackedInZabbix?: boolean;
  seen?: boolean;
}

export interface DemoServer {
  name: string;
  problems: DemoProblem[];
}

export const severityOrder: Severity[] = ['disaster', 'high', 'average', 'warning', 'information', 'notClassified'];

export const severityLabel: Record<Severity, string> = {
  disaster: 'Disaster',
  high: 'High',
  average: 'Average',
  warning: 'Warning',
  information: 'Information',
  notClassified: 'Not classified',
};

export const severityVar: Record<Severity, string> = {
  disaster: 'var(--sev-disaster)',
  high: 'var(--sev-high)',
  average: 'var(--sev-average)',
  warning: 'var(--sev-warning)',
  information: 'var(--sev-information)',
  notClassified: 'var(--sev-not-classified)',
};

export const newProblem: DemoProblem = {
  id: 'new',
  name: 'MySQL: Replication lag is too high (over 30s)',
  hosts: ['db-prod-02'],
  severity: 'high',
  ageSeconds: 0,
  duration: '<1m',
  groups: ['Databases', 'Production'],
};

export const demoServers: DemoServer[] = [
  {
    name: 'Production',
    problems: [
      { id: 'p1', name: 'Zabbix agent is not available (for 3m)', hosts: ['db-prod-01'], severity: 'disaster', ageSeconds: 240, duration: '4m', groups: ['Databases', 'Production'] },
      { id: 'p2', name: 'High CPU utilization (over 90% for 5m)', hosts: ['api-gw-02'], severity: 'high', ageSeconds: 2220, duration: '37m', groups: ['Linux servers', 'Production'] },
      { id: 'p3', name: 'Disk space is low (used > 80%)', hosts: ['fs-backup-01'], severity: 'average', ageSeconds: 19200, duration: '5h 20m', groups: ['Storage'], ackedInZabbix: true },
      { id: 'p4', name: 'Interface eth1: High bandwidth usage', hosts: ['edge-rtr-01'], severity: 'warning', ageSeconds: 57120, duration: '15h 52m', groups: ['Network'], seen: true },
    ],
  },
  {
    name: 'Staging',
    problems: [
      { id: 's1', name: 'Service nginx has been restarted', hosts: ['web-stg-03'], severity: 'information', ageSeconds: 720, duration: '12m', groups: ['Staging', 'Web'] },
    ],
  },
];

/** Problemas pendentes (não vistos) — o que conta no ícone e na cápsula do servidor. */
export function activeCount(server: DemoServer): number {
  return server.problems.filter((problem) => !problem.seen).length;
}

export function totalActive(servers: DemoServer[]): number {
  return servers.reduce((sum, server) => sum + activeCount(server), 0);
}
