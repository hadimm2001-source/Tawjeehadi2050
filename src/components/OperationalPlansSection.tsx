import React, { useState, useMemo } from "react";
import {
  Compass,
  CalendarDays,
  CalendarRange,
  Clock,
  CalendarClock,
  Users,
  Award,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  Brain,
  UserX,
  FileCheck,
  Target,
  HeartHandshake,
  GraduationCap,
  Search,
  ExternalLink,
  FileText,
  Printer,
  Eye,
  BookOpen,
  Filter,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  ChevronLeft
} from "lucide-react";
import { operationalPlansDB, OperationalPlan } from "../operationalPlansData";

interface Props {
  onSelectPlan: (plan: OperationalPlan) => void;
}

export default function OperationalPlansSection({ onSelectPlan }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="w-5 h-5" />,
    CalendarDays: <CalendarDays className="w-5 h-5" />,
    CalendarRange: <CalendarRange className="w-5 h-5" />,
    Clock: <Clock className="w-5 h-5" />,
    CalendarClock: <CalendarClock className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
    Award: <Award className="w-5 h-5" />,
    TrendingUp: <TrendingUp className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5" />,
    Brain: <Brain className="w-5 h-5" />,
    UserX: <UserX className="w-5 h-5" />,
    FileCheck: <FileCheck className="w-5 h-5" />,
    Target: <Target className="w-5 h-5" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    GraduationCap: <GraduationCap className="w-5 h-5" />
  };

  const categories = [
    { id: "all", label: `جميع الخطط (${Object.keys(operationalPlansDB).length})` },
    { id: "الخطط الاستراتيجية والسنوية", label: "الخطط السنوية" },
    { id: "الخطط الفصلية والتشغيلية", label: "الخطط الفصلية" },
    { id: "الجداول والتنظيم الإجرائي", label: "الجداول والتوزيعات" },
    { id: "رعاية الفئات الخاصة", label: "رعاية الفئات" },
    { id: "التحصيل والاختبارات", label: "التحصيل والاختبارات" },
    { id: "الانضباط والشراكة المجتمعية", label: "الانضباط والأسرة" }
  ];

  const filteredPlans = useMemo(() => {
    const plansList = Object.values(operationalPlansDB);
    return plansList.filter((plan) => {
      const matchCategory =
        selectedCategory === "all" ||
        plan.category === selectedCategory ||
        (selectedCategory === "رعاية الفئات الخاصة" && (plan.category as string) === "البرامج والأنشطة الطلابية");

      const matchQuery =
        !searchQuery.trim() ||
        plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.targetGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.code.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="operational-plans-hub" className="space-y-6 scroll-mt-24">
      {/* SECTION HEADER & CONTROL BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0A3E72] to-[#0D8E81] p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 backdrop-blur-md text-teal-200 text-xs font-black px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
                  حقيبة الخطط والوثائق الإرشادية والتشغيلية المعتمدة
                </span>
                <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">
                  {Object.keys(operationalPlansDB).length} خطة جاهزة
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
                بطاقات الخطط السنوية، الفصلية، الإجرائية، ونماذج الرعاية المتكاملة
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm font-medium max-w-3xl leading-relaxed">
                تصفح واستعرض وحمّل كافة الخطط التشغيلية والبرامج التوجيهية المعدة وفق اللوائح الوزارية ونماذج تحضيري، مزودة بالأهداف، المؤشرات، الجداول التنفيذية، ونماذج الرعاية القابلة للطباعة والتصدير الفوري.
              </p>
            </div>

            {/* Quick stats capsule */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-2xl flex items-center gap-4 shrink-0 shadow-lg">
              <div className="text-center px-2 border-l border-white/15">
                <span className="block text-2xl font-black text-white">{Object.keys(operationalPlansDB).length}</span>
                <span className="text-[10px] text-slate-300 font-bold">خطة معتمدة</span>
              </div>
              <div className="text-center px-2 border-l border-white/15">
                <span className="block text-2xl font-black text-teal-300">١٠٠٪</span>
                <span className="text-[10px] text-slate-300 font-bold">جاهزة للاعتماد</span>
              </div>
              <div className="text-center px-2">
                <span className="block text-2xl font-black text-amber-300">PDF & Doc</span>
                <span className="text-[10px] text-slate-300 font-bold">تصدير فوري</span>
              </div>
            </div>
          </div>

          {/* SEARCH AND FILTER BAR */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم، الفئة المستهدفة، أو رمز الخطة..."
                className="w-full bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-300 absolute right-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-300 hover:text-white bg-white/20 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-white text-slate-900 shadow-md font-black scale-105"
                        : "bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* PLANS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlans.map((plan) => {
          return (
            <div
              key={plan.id}
              className="bg-white rounded-3xl border border-slate-200/80 hover:border-teal-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
            >
              {/* Top Accent Gradient Bar */}
              <div className={`h-2.5 bg-gradient-to-r ${plan.colorTheme.gradient} w-full`} />

              <div className="p-5 sm:p-6 space-y-4 flex-grow flex flex-col justify-between">
                
                <div className="space-y-3">
                  {/* Category, Code, and External Link */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-md ${plan.colorTheme.badgeBg} ${plan.colorTheme.badgeText}`}>
                        {plan.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {plan.code}
                      </span>
                    </div>

                    <a
                      href={plan.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-teal-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                      title="فتح رابط المصدر الأصلي على تحضيري"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-2xl shrink-0 ${plan.colorTheme.iconBg} ${plan.colorTheme.iconColor} group-hover:scale-110 transition-transform shadow-2xs`}>
                      {iconMap[plan.iconName] || <BookOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                        {plan.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1 line-clamp-2 leading-relaxed">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Chips */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-bold text-[11px] text-slate-400">المستهدفون:</span>
                      <span className="font-extrabold text-slate-800 text-[11px] text-left max-w-[65%] truncate">
                        {plan.targetGroup}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-bold text-[11px] text-slate-400">الفترة:</span>
                      <span className="font-extrabold text-teal-700 text-[11px] text-left max-w-[65%] truncate">
                        {plan.timing}
                      </span>
                    </div>
                  </div>

                  {/* Micro KPI highlight */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      أبرز مؤشرات الخطة:
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{plan.goals[0]?.indicator || "تحقيق مستهدفات الرعاية الإرشادية"}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className="flex-grow bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-2.5 px-3 rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
                  >
                    <Eye className="w-4 h-4" />
                    استعراض وتخصيص الخطة
                  </button>

                  <a
                    href={plan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0"
                    title="زيارة رابط تحضيري الأصلي"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-600" />
                  </a>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {filteredPlans.length === 0 && (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-base font-black text-slate-700">لم يتم العثور على خطط تطابق بحثك</h4>
          <p className="text-xs text-slate-500">جرب البحث بكلمات أخرى أو اختر فئة مختلفة من التصنيفات أعلاه.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
          >
            إعادة تعيين البحث
          </button>
        </div>
      )}
    </section>
  );
}
