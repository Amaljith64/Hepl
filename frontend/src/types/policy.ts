
export type  PolicyType = 'TL' |'HL' | 'VH'

export interface Policy {
    id: number;
    name: string;
    type: PolicyType;
    premium: number;
    coverage: number;
  }

  