import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  TrendingUp,
  CheckCircle2,
  Award,
  BookOpen,
  Users,
  MessageSquare,
  Sparkles,
  Star,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Presentation,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getStableStatsForQuestion, analyzeQuestionnaire, getQualitativeAnalysisForProgram, PROGRAM_QUESTIONS } from "../App";
import { Program } from "../types";

interface PresentationSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program;
}

export default function PresentationSlidesModal({ isOpen, onClose, program }: PresentationSlidesModalProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [interactiveQuestionIdx, setInteractiveQuestionIdx] = useState<number>(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const totalSlides = 6;
  const autoplayDuration = 6000; // 6 seconds per slide

  const analysis = analyzeQuestionnaire(program.id);
  const qualitative = getQualitativeAnalysisForProgram(program.id, analysis.top3, analysis.bottom3);

  // Re-run fallback if qualitative analysis is empty or generic
  const fallbackQuestions = [
    "شعر المشاركون بالترحيب والأمان التام أثناء تنفيذ البرنامج.",
    "ملاءمة المادة العلمية والأنشطة المقدمة للفئات المستهدفة.",
    "تفاعل الكادر التعليمي والإداري بفعالية لإنجاح أهداف البرنامج.",
    "سهولة وصول الفئة المستهدفة لمقر الفعاليات والخدمات.",
    "وضوح أهداف ورسالة البرنامج للطلاب وأولياء أمورهم.",
    "كفاية الموارد المادية والهدايا والتجهيزات المصاحبة للفعاليات.",
    "الرضا العام لولي الأمر عن تواصل المدرسة المباشر معه.",
    "تكامل برامج الرعاية السلوكية والوقائية لبناء قيم الطلاب.",
    "بث روح التعاون والعمل الجماعي بين المشاركين بالبرنامج.",
    "الالتحاق والتجاوب الفوري للمستهدفين مع توجيهات الموجه الطلابي."
  ];

  const questionsList = (PROGRAM_QUESTIONS[program.id] || fallbackQuestions).slice(0, 10);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying) {
      setProgressPercent(0);
      const startTime = Date.now();

      autoplayTimerRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, autoplayDuration);

      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const percentage = Math.min((elapsed / autoplayDuration) * 100, 100);
        setProgressPercent(percentage);
      }, 50);
    } else {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setProgressPercent(0);
    }

    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleGoToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setIsPlaying(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === " ") {
        e.preventDefault();
        handleTogglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-md select-none">
      <div className="bg-[#050C16] border border-slate-800 rounded-3xl shadow-2xl w-full max-w-6xl h-[92vh] max-h-[92vh] flex flex-col overflow-hidden relative text-right text-slate-100">
        
        {/* Top Header Controls */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/40 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D8E81] to-[#0A3E72] text-white flex items-center justify-center shadow-lg shadow-teal-500/10">
              <Presentation className="w-5 h-5 text-[#4ADE80]" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-xs sm:text-base flex items-center gap-2">
                لوحة الشرائح البيانية التفاعلية للأثر والرضا
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black px-2.5 py-0.5 rounded-full">
                  استبانة التحليل 1447هـ
                </span>
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold mt-0.5">
                تصفح بياني ذكي للبرنامج: <span className="text-teal-400 font-black">{program.title}</span> • مدرسة الجشة المتوسطة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Autoplay play/pause */}
            <button
              onClick={handleTogglePlay}
              title={isPlaying ? "إيقاف مؤقت للتشغيل التلقائي" : "تشغيل تلقائي للشرائح"}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                isPlaying
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                  : "bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-700/80"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 animate-pulse" />
                  <span>إيقاف تلقائي</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>عرض تلقائي</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 cursor-pointer bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Autoplay Progress Bar */}
        {isPlaying && (
          <div className="w-full h-1 bg-slate-900 relative z-20 shrink-0">
            <div
              className="h-full bg-gradient-to-r from-[#4ADE80] to-[#38BDF8] transition-all ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Main Presentation Stage */}
        <div className="flex-grow flex flex-col justify-center items-center p-3 sm:p-6 bg-radial from-slate-900/60 to-[#030811] relative overflow-hidden">
          
          {/* Ambient Glowing Background Circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#0D8E81]/8 blur-[110px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#0A3E72]/8 blur-[110px] pointer-events-none" />

          {/* Slides Container with Animation */}
          <div className="w-full max-w-4xl h-full flex items-center justify-center relative min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 25, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -25, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full h-full flex flex-col justify-center p-2"
              >
                {/* Slide 0: Cover Slide */}
                {currentSlide === 0 && (
                  <div className="w-full bg-slate-900/40 border border-slate-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row gap-6 items-center justify-between text-right relative overflow-hidden shadow-2xl">
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-teal-500/10 to-transparent blur-2xl pointer-events-none" />
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-tr from-blue-500/10 to-transparent blur-2xl pointer-events-none" />
                    
                    <div className="flex-1 space-y-4 md:space-y-5">
                      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-[#4ADE80] border border-emerald-500/20 px-3.5 py-1.5 rounded-xl font-bold text-xs">
                        <Award className="w-4 h-4 animate-bounce" />
                        <span>منصة التوجيه الطلابي بمدرسة الجشة</span>
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                        العرض البياني لقياس الأثر ونواتج الاستبانة
                      </h2>
                      <p className="text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed">
                        نستعرض في هذا التقرير التفاعلي تحليل آراء وانطباعات الفئة المستهدفة البالغ عددهم <strong className="text-white">٥٠ مستجيباً</strong> (طلاب ومعلمين وأولياء أمور) للوقوف على جودة وكفاءة تفعيل مخرجات هذا البرنامج.
                      </p>
                      
                      <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-300 font-bold pt-2">
                        <span className="flex items-center gap-1 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-800">
                          <Users className="w-3.5 h-3.5 text-sky-400" />
                          عينة الدراسة: ٥٠ مستجيباً
                        </span>
                        <span className="flex items-center gap-1 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-800">
                          <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                          عدد البنود: ١٠ بنود
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 bg-slate-950/40 border border-slate-800 rounded-2xl relative shrink-0 w-full md:w-72">
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* Circular ring indicator */}
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="66"
                            className="stroke-slate-800"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="66"
                            className="stroke-[#0D8E81] drop-shadow-[0_0_8px_rgba(13,142,129,0.3)]"
                            strokeWidth="10"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 66}
                            strokeDashoffset={2 * Math.PI * 66 * (1 - analysis.overallApproval / 100)}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-3xl font-black text-white">{analysis.overallApproval}%</span>
                          <span className="text-[10px] text-slate-400 block font-bold mt-1">مؤشر الرضا الإجمالي</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full mt-4">
                        مستوى أثر ممتاز ومثبت
                      </span>
                    </div>
                  </div>
                )}

                {/* Slide 1: Average Distribution */}
                {currentSlide === 1 && (
                  <div className="w-full bg-slate-900/40 border border-slate-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col gap-5 text-right relative shadow-2xl">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-sky-400" />
                        توزيع متوسط خيارات الرضا الإجمالي
                      </h3>
                      <span className="text-[10px] text-slate-400 font-bold">بناءً على متوسط الاستجابات لكافة البنود الـ ١٠</span>
                    </div>

                    <p className="text-slate-300 text-xs font-semibold leading-relaxed">
                      يوضح المخطط أدناه توزيع خيارات المستجيبين (٥٠ عينة) بمتوسط النسب المئوية لكافة البنود التي تضمنتها الاستبانة التقويمية الخاصة بهذا البرنامج، مما يدل على انسجام وموثوقية الأثر:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                      {/* Strongly agree */}
                      <div className="bg-emerald-950/20 border border-emerald-800/35 p-4 rounded-xl flex flex-col justify-between relative group hover:border-emerald-500/40 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-emerald-300">موافق بشدة</span>
                          <span className="text-2xl font-black text-white">{analysis.avgStronglyAgree}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-4">
                          <div className="h-full bg-emerald-500" style={{ width: `${analysis.avgStronglyAgree}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold mt-2.5">
                          يمثل متوسط العينات ذات الرضا الأعلى
                        </span>
                      </div>

                      {/* Agree */}
                      <div className="bg-sky-950/20 border border-sky-800/35 p-4 rounded-xl flex flex-col justify-between relative group hover:border-sky-500/40 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-sky-300">موافق</span>
                          <span className="text-2xl font-black text-white">{analysis.avgAgree}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-4">
                          <div className="h-full bg-sky-500" style={{ width: `${analysis.avgAgree}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold mt-2.5">
                          تأييد إيجابي إضافي للبرنامج
                        </span>
                      </div>

                      {/* Neutral */}
                      <div className="bg-amber-950/10 border border-amber-800/35 p-4 rounded-xl flex flex-col justify-between relative group hover:border-amber-500/40 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-amber-300">محايد</span>
                          <span className="text-2xl font-black text-white">{analysis.avgNeutral}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-4">
                          <div className="h-full bg-amber-500" style={{ width: `${analysis.avgNeutral}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold mt-2.5">
                          آراء غير مندفعة تحت الملاحظة
                        </span>
                      </div>

                      {/* Disagree */}
                      <div className="bg-rose-950/10 border border-rose-800/35 p-4 rounded-xl flex flex-col justify-between relative group hover:border-rose-500/40 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-rose-300">غير موافق</span>
                          <span className="text-2xl font-black text-white">{analysis.avgDisagree}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-4">
                          <div className="h-full bg-rose-500" style={{ width: `${analysis.avgDisagree}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold mt-2.5">
                          فرص تطوير وحالات نادرة للتحسين
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-800/35 border border-slate-800 rounded-xl p-3 text-xs leading-relaxed text-slate-300 font-bold">
                      💡 <strong className="text-teal-400">ملخص قراءة الموجه:</strong> يبرهن المؤشر الإجمالي العام على ارتفاع معدلات السعادة والانخراط وبناء اتجاهات إيجابية بين الطلاب وأولياء أمورهم بمدرسة الجشة المتوسطة، مع بقاء نسب الرفض أو الحياد في الحدود الطبيعية الدنيا المقبولة إدارياً.
                    </div>
                  </div>
                )}

                {/* Slide 2: Top Strengths */}
                {currentSlide === 2 && (
                  <div className="w-full bg-slate-900/40 border border-slate-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col gap-4 text-right relative shadow-2xl">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h3 className="text-lg sm:text-xl font-black text-[#4ADE80] flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        مكامن التميز السلوكي والأثر الأعلى (البنود الـ ٣ الأكثر موافقة)
                      </h3>
                      <span className="text-[10px] text-slate-400 font-bold">نقاط القوة الأساسية للبرنامج</span>
                    </div>

                    <p className="text-slate-300 text-xs font-semibold leading-relaxed mb-1">
                      حازت البنود التالية على أعلى نسب تأييد وموافقة (موافق بشدة + موافق) من الفئة المستهدفة، وتعد هذه ركائز التميز في هذا البرنامج التي تم رصدها بمدرسة الجشة المتوسطة:
                    </p>

                    <div className="space-y-3.5">
                      {analysis.top3.map((item, idx) => (
                        <div key={idx} className="bg-slate-950/45 border border-slate-800 p-4 rounded-xl flex items-start gap-4 hover:border-emerald-500/30 transition-all">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-sm shrink-0 border border-emerald-500/20">
                            {item.index}
                          </div>
                          <div className="flex-grow space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-slate-400">بند رقم {item.index}</span>
                              <span className="text-xs font-black text-[#4ADE80] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                {item.approvalPct}% موافقة وتأييد
                              </span>
                            </div>
                            <p className="text-sm font-black text-white leading-relaxed">{item.question}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Slide 3: Opportunities */}
                {currentSlide === 3 && (
                  <div className="w-full bg-slate-900/40 border border-slate-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col gap-4 text-right relative shadow-2xl">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h3 className="text-lg sm:text-xl font-black text-amber-400 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        فرص التطوير والتحسين المستهدف (البنود الـ ٣ الأقل موافقة)
                      </h3>
                      <span className="text-[10px] text-slate-400 font-bold">بؤر التحسين الميداني</span>
                    </div>

                    <p className="text-slate-300 text-xs font-semibold leading-relaxed mb-1">
                      حازت البنود التالية على النسب الأدنى للتأييد (أو أعلى نسب حيادية أو عدم موافقة)، مما يمثل فرصاً للتطوير وصياغة خطط الدعم لرفع كفاءة تفعيل البرنامج مستقبلاً:
                    </p>

                    <div className="space-y-3.5">
                      {analysis.bottom3.map((item, idx) => (
                        <div key={idx} className="bg-slate-950/45 border border-slate-800 p-4 rounded-xl flex items-start gap-4 hover:border-amber-500/30 transition-all">
                          <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-black text-sm shrink-0 border border-amber-500/20">
                            {item.index}
                          </div>
                          <div className="flex-grow space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-slate-400">بند رقم {item.index}</span>
                              <span className="text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                                {item.approvalPct}% موافقة
                              </span>
                            </div>
                            <p className="text-sm font-black text-white leading-relaxed">{item.question}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Slide 4: Interactive Item-by-Item Explorer */}
                {currentSlide === 4 && (
                  <div className="w-full bg-slate-900/40 border border-slate-800/60 backdrop-blur-md rounded-2xl p-4 sm:p-7 flex flex-col gap-4 text-right relative shadow-2xl h-full justify-center">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-2.5 gap-2 shrink-0">
                      <div>
                        <h3 className="text-md sm:text-lg font-black text-white flex items-center gap-1.5">
                          <Sparkles className="w-4.5 h-4.5 text-teal-400" />
                          المستعرض الإحصائي التفاعلي لبنود الاستبانة تفصيلياً
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">انقر على رقم البند لاستعراض رسم بياني تفصيلي لاستجابات المستجيبين الـ ٥٠</p>
                      </div>
                      
                      {/* Sub selector for 10 items */}
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: 10 }).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setInteractiveQuestionIdx(idx)}
                            className={`w-7 h-7 rounded-lg text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                              interactiveQuestionIdx === idx
                                ? "bg-gradient-to-br from-[#0D8E81] to-[#0A3E72] text-white border border-teal-400/50 scale-105"
                                : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-800"
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Question Details */}
                    {(() => {
                      const qStats = getStableStatsForQuestion(program.id, interactiveQuestionIdx);
                      const qText = questionsList[interactiveQuestionIdx];
                      return (
                        <div className="flex-grow flex flex-col md:flex-row gap-5 items-center justify-center p-2 min-h-0">
                          
                          {/* Left Details column */}
                          <div className="flex-1 space-y-3.5 w-full">
                            <div className="flex items-center gap-2">
                              <span className="bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-black px-3 py-1 rounded-md shrink-0">
                                بند رقم {interactiveQuestionIdx + 1}
                              </span>
                              <span className="text-[11px] text-slate-400 font-extrabold">من أصل ١٠ بنود قياس الأثر</span>
                            </div>
                            <h4 className="text-sm sm:text-base font-black text-white leading-relaxed h-14 overflow-y-auto pr-1">
                              {qText}
                            </h4>
                            <div className="bg-slate-800/30 border border-slate-800/80 p-3 rounded-xl text-[11px] text-slate-300 leading-relaxed font-bold">
                              📊 يظهر التحليل تفاعل متميزاً ومستقراً حيث تبلغ نسبة التأييد الإجمالية لهذا البند <strong className="text-emerald-400">{qStats.stronglyAgreePct + qStats.agreePct}%</strong> مقارنة بـ {qStats.disagreePct}% من عدم الموافقة.
                            </div>
                          </div>

                          {/* Right bar columns */}
                          <div className="w-full md:w-80 space-y-2.5 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                            {/* Strongly Agree */}
                            <div>
                              <div className="flex justify-between text-[10px] font-extrabold text-slate-300 mb-1">
                                <span>موافق بشدة</span>
                                <span className="text-emerald-400 font-black">{qStats.stronglyAgreePct}% ({qStats.stronglyAgree} مستجيب)</span>
                              </div>
                              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${qStats.stronglyAgreePct}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="bg-emerald-500 h-full rounded-full"
                                />
                              </div>
                            </div>

                            {/* Agree */}
                            <div>
                              <div className="flex justify-between text-[10px] font-extrabold text-slate-300 mb-1">
                                <span>موافق</span>
                                <span className="text-sky-400 font-black">{qStats.agreePct}% ({qStats.agree} - مستجيب)</span>
                              </div>
                              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${qStats.agreePct}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="bg-sky-500 h-full rounded-full"
                                />
                              </div>
                            </div>

                            {/* Neutral */}
                            <div>
                              <div className="flex justify-between text-[10px] font-extrabold text-slate-300 mb-1">
                                <span>محايد</span>
                                <span className="text-amber-400 font-black">{qStats.neutralPct}% ({qStats.neutral} - مستجيب)</span>
                              </div>
                              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${qStats.neutralPct}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="bg-amber-400 h-full rounded-full"
                                />
                              </div>
                            </div>

                            {/* Disagree */}
                            <div>
                              <div className="flex justify-between text-[10px] font-extrabold text-slate-300 mb-1">
                                <span>غير موافق</span>
                                <span className="text-rose-400 font-black">{qStats.disagreePct}% ({qStats.disagree} - مستجيب)</span>
                              </div>
                              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${qStats.disagreePct}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="bg-rose-500 h-full rounded-full"
                                />
                              </div>
                            </div>
                          </div>

                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Slide 5: Qualitative Interpretation & Recommendations */}
                {currentSlide === 5 && (
                  <div className="w-full bg-slate-900/40 border border-slate-800/60 backdrop-blur-md rounded-2xl p-5 sm:p-8 flex flex-col gap-4 text-right relative shadow-2xl h-full justify-center">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3 shrink-0">
                      <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-emerald-400" />
                        التحليل التفسيري الكيفي والتوجهات المستقبلية لدعم الأثر
                      </h3>
                      <span className="text-[10px] text-slate-400 font-bold">التوصيات القيادية والتفسيرية</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-y-auto pr-1">
                      {/* Left: Dimensions list */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-black text-slate-300 flex items-center gap-1">
                          <Check className="w-4 h-4 text-emerald-400" /> مخرجات الأثر الكيفي المنظورة
                        </h4>
                        <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 text-[11px] leading-relaxed text-slate-300 space-y-2.5">
                          <p dangerouslySetInnerHTML={{ __html: qualitative.dimension1 }} />
                          <p dangerouslySetInnerHTML={{ __html: qualitative.dimension2 }} />
                          <p dangerouslySetInnerHTML={{ __html: qualitative.dimension3 }} />
                        </div>
                      </div>

                      {/* Right: Recommendation Quote card */}
                      <div className="flex flex-col justify-center">
                        <div className="bg-gradient-to-br from-teal-950/40 to-[#0A3E72]/25 border border-teal-800/50 rounded-xl p-5 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                          <div className="flex items-center gap-2 mb-2 text-emerald-400">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <h5 className="font-black text-xs">التوصية الكيفية العامة لدعم الأثر واستدامته:</h5>
                          </div>
                          <p className="text-xs font-semibold leading-relaxed text-slate-200 text-justify">
                            {qualitative.conclusion}
                          </p>
                          <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-bold">الموجه الطلابي • مدرسة الجشة</span>
                            <span className="text-[9px] text-[#4ADE80] font-black bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                              موافقة واعتماد الإدارة
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Next and Previous Arrow Controls */}
            <button
              onClick={handlePrev}
              title="الشريحة السابقة"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105 hover:border-teal-500/40 active:scale-95 group z-35"
            >
              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </button>
            <button
              onClick={handleNext}
              title="الشريحة التالية"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105 hover:border-teal-500/40 active:scale-95 group z-35"
            >
              <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </button>
          </div>

        </div>

        {/* Footer controls: Slide indicators & play tools */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-extrabold">الشريحة</span>
            <span className="text-xs text-white font-black">{currentSlide + 1}</span>
            <span className="text-xs text-slate-500 font-bold">من أصل</span>
            <span className="text-xs text-slate-400 font-extrabold">{totalSlides}</span>
          </div>

          {/* Dots Indicators */}
          <div className="flex gap-2.5">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleGoToSlide(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? "w-7 bg-teal-500" : "w-2.5 bg-slate-700 hover:bg-slate-600"
                }`}
                title={`الذهاب إلى الشريحة ${idx + 1}`}
              />
            ))}
          </div>

          {/* Additional operations */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-bold hidden sm:inline">
              اضغط على الأسهم للتبديل، أو المسافة للتشغيل
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-black bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              إغلاق نافذة العرض
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
