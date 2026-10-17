export interface KPI {
  target: number;
  color: string;
  label: string;
  title: string;
  desc: string;
}

export interface Phase {
  id: string;
  title: string;
  timing: string;
  target: string;
  procedures: string[];
}

export interface Recommendation {
  title: string;
  desc: string;
}

export interface Challenge {
  title: string;
  desc: string;
}

export interface Verification {
  reqs: string[];
  ai_role: string;
}

export interface Program {
  id: string;
  category: string;
  title: string;
  iconName: string; // Lucide icon name, e.g. "School", "Brain"
  nature: string;
  duration: string;
  mission: string;
  kpis: {
    chart1: KPI;
    chart2: KPI;
    chart3: KPI;
    metric: {
      value: number;
      title: string;
      desc: string;
    };
  };
  timeline: Phase[];
  recs: Recommendation[];
  challenges: Challenge[];
  verification?: Verification;
}

export interface Student {
  name: string;
  className: string;
}

export interface ParentVisit {
  id: string;
  parentName: string;
  studentName: string;
  className: string;
  purpose: string;
  date: string;
  notes: string;
  status?: 'تمت' | 'ملغاة' | 'مجدولة';
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}
