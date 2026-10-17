import React, { useState } from "react";
import {
  X,
  Printer,
  FileText,
  ExternalLink,
  Download,
  CheckCircle2,
  Calendar,
  Users,
  Target,
  FileCheck,
  AlertTriangle,
  Lightbulb,
  Building,
  UserCheck,
  Clock,
  Sparkles
} from "lucide-react";
import { OperationalPlan } from "../operationalPlansData";

interface Props {
  plan: OperationalPlan | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OperationalPlanModal({ plan, isOpen, onClose }: Props) {
  const [schoolName, setSchoolName] = useState<string>("مدرسة الجشة المتوسطة");
  const [counselorName, setCounselorName] = useState<string>("عبدالهادي بن محمد المحسن");
  const [principalName, setPrincipalName] = useState<string>("أحمد بن ناصر الدوسري");
  const [academicYear, setAcademicYear] = useState<string>("١٤٤٧ / ١٤٤٨ هـ");
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen || !plan) return null;

  // Print function with official Ministry template
  const handlePrint = () => {
    const printContent = document.getElementById("operational-plan-print-target");
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="utf-8">
          <title>${plan.title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
            @page {
              size: A4;
              margin: 12mm 15mm;
            }
            body {
              font-family: 'Tajawal', sans-serif;
              color: #0f172a;
              background-color: #ffffff;
              margin: 0;
              padding: 0;
              line-height: 1.5;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .header-table {
              width: 100%;
              border-collapse: collapse;
              border-bottom: 2px solid #0d9488;
              padding-bottom: 12px;
              margin-bottom: 16px;
            }
            .title-banner {
              background: linear-gradient(135deg, #0f766e, #0369a1);
              color: #ffffff;
              padding: 12px 18px;
              border-radius: 8px;
              text-align: center;
              margin-bottom: 16px;
            }
            .info-grid {
              display: table;
              width: 100%;
              margin-bottom: 16px;
              border: 1px solid #cbd5e1;
              border-radius: 6px;
              background-color: #f8fafc;
            }
            .info-row {
              display: table-row;
            }
            .info-cell {
              display: table-cell;
              padding: 8px 12px;
              font-size: 12px;
              border-bottom: 1px solid #e2e8f0;
            }
            .section-title {
              font-size: 14px;
              font-weight: 800;
              color: #0f766e;
              border-right: 4px solid #0f766e;
              padding-right: 8px;
              margin: 14px 0 8px 0;
            }
            table.data-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 14px;
              font-size: 11px;
            }
            table.data-table th {
              background-color: #0f766e;
              color: #ffffff;
              padding: 8px 10px;
              border: 1px solid #0f766e;
              font-weight: 700;
              text-align: right;
            }
            table.data-table td {
              padding: 7px 10px;
              border: 1px solid #cbd5e1;
              vertical-align: top;
            }
            table.data-table tr:nth-child(even) td {
              background-color: #f8fafc;
            }
            .footer-signatures {
              margin-top: 24px;
              display: table;
              width: 100%;
              page-break-inside: avoid;
            }
            .signature-cell {
              display: table-cell;
              width: 50%;
              text-align: center;
              font-size: 12px;
              font-weight: 700;
              padding: 10px;
            }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td style="width: 33%; text-align: right; font-size: 11px; line-height: 1.6;">
                <strong>المملكة العربية السعودية</strong><br>
                <strong>وزارة التعليم</strong><br>
                إدارة التوجيه الطلابي<br>
                ${schoolName}
              </td>
              <td style="width: 34%; text-align: center;">
                <div style="font-size: 13px; font-weight: 900; color: #0f766e;">الإدارة العامة للتوجيه الطلابي</div>
                <div style="font-size: 11px; color: #64748b; font-weight: bold; margin-top: 4px;">العام الدراسي ${academicYear}</div>
              </td>
              <td style="width: 33%; text-align: left; font-size: 11px; line-height: 1.6;">
                <strong>رمز الوثيقة:</strong> ${plan.code}<br>
                <strong>التصنيف:</strong> ${plan.category}<br>
                <strong>الفترة:</strong> ${plan.timing}
              </td>
            </tr>
          </table>

          <div class="title-banner">
            <h1 style="margin: 0; font-size: 18px; font-weight: 900;">${plan.title}</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.95;">${plan.subtitle}</p>
          </div>

          <div class="info-grid">
            <div class="info-row">
              <div class="info-cell"><strong>الفئة المستهدفة:</strong> ${plan.targetGroup}</div>
              <div class="info-cell"><strong>الفترة الزمنية:</strong> ${plan.timing}</div>
            </div>
            <div class="info-row">
              <div class="info-cell" style="border-bottom: none;" colspan="2"><strong>الهدف العام:</strong> ${plan.generalGoal}</div>
            </div>
          </div>

          <div class="section-title">أولاً: الأهداف التفصيلية ومؤشرات الإنجاز</div>
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 8%; text-align: center;">م</th>
                <th style="width: 52%;">الهدف الإجرائي / التفصيلي</th>
                <th style="width: 40%;">مؤشر التحقق والإنجاز</th>
              </tr>
            </thead>
            <tbody>
              ${plan.goals.map((g) => `
                <tr>
                  <td style="text-align: center; font-weight: bold;">${g.id}</td>
                  <td>${g.goal}</td>
                  <td style="color: #0369a1; font-weight: 600;">${g.indicator}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div class="section-title">ثانياً: مصفوفة الإجراءات والمهام التنفيذية</div>
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 6%; text-align: center;">م</th>
                <th style="width: 36%;">الإجراء / المهمة التنفيذية</th>
                <th style="width: 18%;">الفئة المستهدفة</th>
                <th style="width: 16%;">المسؤول عن التنفيذ</th>
                <th style="width: 12%;">التوقيت</th>
                <th style="width: 12%;">شاهد الإنجاز</th>
              </tr>
            </thead>
            <tbody>
              ${plan.procedures.map((p) => `
                <tr>
                  <td style="text-align: center; font-weight: bold;">${p.id}</td>
                  <td style="font-weight: 600;">${p.action}</td>
                  <td>${p.target}</td>
                  <td style="color: #0f766e;">${p.responsible}</td>
                  <td>${p.timing}</td>
                  <td style="font-size: 10px; color: #475569;">${p.evidence}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <table class="footer-signatures">
            <tr>
              <td class="signature-cell">
                الموجه الطلابي المعد للخطة<br><br>
                <strong>${counselorName}</strong><br>
                التوقيع: ..........................
              </td>
              <td class="signature-cell">
                يعتمد / مدير المدرسة<br><br>
                <strong>${principalName}</strong><br>
                الختم والتوقيع: ..........................
              </td>
            </tr>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  // Export to Word document (.doc)
  const handleExportWord = () => {
    setIsExporting(true);
    try {
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>${plan.title}</title>
          <style>
            body { font-family: 'Arial', sans-serif; direction: rtl; text-align: right; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            th { background-color: #0f766e; color: #ffffff; padding: 8px; border: 1px solid #0f766e; }
            td { padding: 8px; border: 1px solid #cbd5e1; font-size: 12px; }
            .header-banner { background-color: #0f766e; color: white; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 20px;">
            <h3>المملكة العربية السعودية - وزارة التعليم</h3>
            <h4>إدارة التوجيه الطلابي - ${schoolName}</h4>
            <div class="header-banner">${plan.title}</div>
            <p>${plan.subtitle}</p>
          </div>

          <p><strong>العام الدراسي:</strong> ${academicYear} | <strong>الفترة:</strong> ${plan.timing}</p>
          <p><strong>المستهدفون:</strong> ${plan.targetGroup}</p>
          <p><strong>الهدف العام:</strong> ${plan.generalGoal}</p>

          <h4 style="color: #0f766e;">أولاً: الأهداف التفصيلية والمؤشرات</h4>
          <table>
            <tr><th>م</th><th>الهدف الإجرائي</th><th>مؤشر الإنجاز</th></tr>
            ${plan.goals.map(g => `<tr><td>${g.id}</td><td>${g.goal}</td><td>${g.indicator}</td></tr>`).join("")}
          </table>

          <h4 style="color: #0f766e;">ثانياً: الإجراءات والمهام التنفيذية</h4>
          <table>
            <tr><th>م</th><th>المهمة / الإجراء</th><th>المستهدف</th><th>المسؤول</th><th>التوقيت</th><th>شاهد الإنجاز</th></tr>
            ${plan.procedures.map(p => `<tr><td>${p.id}</td><td>${p.action}</td><td>${p.target}</td><td>${p.responsible}</td><td>${p.timing}</td><td>${p.evidence}</td></tr>`).join("")}
          </table>

          <br><br>
          <table style="border: none;">
            <tr>
              <td style="border: none; text-align: center; width: 50%;">الموجه الطلابي: <strong>${counselorName}</strong></td>
              <td style="border: none; text-align: center; width: 50%;">مدير المدرسة: <strong>${principalName}</strong></td>
            </tr>
          </table>
        </body>
        </html>
      `;

      const blob = new Blob(["\ufeff" + htmlContent], {
        type: "application/msword"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${plan.title}_${academicYear.replace(/[^0-9]/g, "")}.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export word failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* MODAL TOP HEADER */}
        <div className={`p-5 sm:p-6 bg-gradient-to-r ${plan.colorTheme.gradient} text-white flex items-center justify-between shrink-0 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">
                  {plan.code}
                </span>
                <span className="text-[11px] font-bold text-white/90">
                  {plan.category}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black mt-1 leading-tight tracking-tight">
                {plan.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 text-white p-2.5 rounded-xl transition-all border border-white/20 flex items-center gap-1.5 text-xs font-bold shadow-xs hover:scale-105"
              title="فتح الرابط المرجعي الأصلي"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">المصدر الأصلي</span>
            </a>

            <button
              onClick={onClose}
              className="bg-white/15 hover:bg-white/30 text-white p-2.5 rounded-xl transition-all border border-white/20 cursor-pointer hover:rotate-90"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CUSTOMIZATION BAR */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 font-bold mb-1">اسم المدرسة:</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-teal-600 shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold mb-1">الموجه الطلابي:</label>
              <input
                type="text"
                value={counselorName}
                onChange={(e) => setCounselorName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-teal-600 shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold mb-1">مدير المدرسة:</label>
              <input
                type="text"
                value={principalName}
                onChange={(e) => setPrincipalName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-teal-600 shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold mb-1">العام الدراسي:</label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-teal-600 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* MODAL MAIN SCROLLABLE BODY */}
        <div id="operational-plan-print-target" className="p-5 sm:p-7 overflow-y-auto flex-grow space-y-6 text-right">
          
          {/* Quick Highlights Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">المستهدفون</span>
                <span className="text-xs sm:text-sm font-black text-slate-800">{plan.targetGroup}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
              <div className="p-2.5 bg-teal-100 text-teal-700 rounded-xl shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">الفترة والتوقيت</span>
                <span className="text-xs sm:text-sm font-black text-slate-800">{plan.timing}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
              <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">نوع ومجال الخطة</span>
                <span className="text-xs sm:text-sm font-black text-slate-800">{plan.category}</span>
              </div>
            </div>
          </div>

          {/* General Goal Box */}
          <div className="bg-gradient-to-br from-teal-50/60 to-emerald-50/40 p-5 rounded-2xl border border-teal-100/80">
            <h4 className="text-xs sm:text-sm font-black text-teal-900 flex items-center gap-2 mb-1.5">
              <Target className="w-4 h-4 text-teal-700" />
              الهدف العام الاستراتيجي للخطة:
            </h4>
            <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
              {plan.generalGoal}
            </p>
          </div>

          {/* Goals and KPIs Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
              الأهداف الإجرائية التفصيلية ومؤشرات الإنجاز والتحقق
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-12 text-center">م</th>
                    <th className="p-3">الهدف الإجرائي / التفصيلي</th>
                    <th className="p-3">مؤشر التحقق والأثر المتوقع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {plan.goals.map((goal) => (
                    <tr key={goal.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 text-center font-bold text-slate-500 bg-slate-50/50">{goal.id}</td>
                      <td className="p-3 font-bold text-slate-800 leading-relaxed">{goal.goal}</td>
                      <td className="p-3 font-semibold text-teal-700 bg-teal-50/20">{goal.indicator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Procedures & Action Items Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-4.5 h-4.5 text-blue-600" />
              مصفوفة الإجراءات والمهام التنفيذية والمسؤوليات
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-10 text-center">م</th>
                    <th className="p-3">المهمة / الإجراء التنفيذي</th>
                    <th className="p-3 w-32">المستهدف</th>
                    <th className="p-3 w-36">المسؤول عن التنفيذ</th>
                    <th className="p-3 w-28">التوقيت</th>
                    <th className="p-3 w-36">شاهد الإنجاز</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {plan.procedures.map((proc) => (
                    <tr key={proc.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 text-center font-bold text-slate-500 bg-slate-50/50">{proc.id}</td>
                      <td className="p-3 font-black text-slate-800">{proc.action}</td>
                      <td className="p-3 font-semibold text-slate-600">{proc.target}</td>
                      <td className="p-3 font-bold text-teal-700 bg-teal-50/30">{proc.responsible}</td>
                      <td className="p-3 font-semibold text-indigo-700">{proc.timing}</td>
                      <td className="p-3 text-slate-500 font-medium text-[11px] bg-slate-50/30">{proc.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations & Challenges in Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Recommendations */}
            <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-200/60 space-y-2">
              <h5 className="text-xs font-black text-amber-900 flex items-center gap-1.5 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                توصيات إرشادية لتحقيق أعلى كفاءة وتأثير:
              </h5>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                {plan.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges & Solutions */}
            <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-200/60 space-y-2">
              <h5 className="text-xs font-black text-rose-900 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                تحديات متوقعة وحلولها الإجرائية المعتمدة:
              </h5>
              {plan.challenges.length > 0 ? (
                <div className="space-y-2">
                  {plan.challenges.map((c, idx) => (
                    <div key={idx} className="bg-white/80 p-2.5 rounded-xl border border-rose-100 text-xs">
                      <strong className="text-rose-900 block mb-0.5 font-bold">{c.title}:</strong>
                      <span className="text-slate-700 leading-relaxed">{c.solution}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/80 p-3 rounded-xl border border-rose-100 text-xs text-slate-500 font-medium">
                  لا توجد عوائق تشغيلية متوقعة مع الالتزام بالجدول الزمني.
                </div>
              )}
            </div>

          </div>

        </div>

        {/* MODAL FOOTER CONTROLS */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              وثيقة إرشادية موثقة وفق اللوائح الوزارية
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-102"
            >
              <Printer className="w-4 h-4" />
              طباعة / تصدير PDF
            </button>

            <button
              onClick={handleExportWord}
              disabled={isExporting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-102 disabled:bg-slate-300"
            >
              <FileText className="w-4 h-4" />
              {isExporting ? "جاري التصدير..." : "تصدير Word ملون"}
            </button>

            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
