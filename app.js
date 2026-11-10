// app.js
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn?.addEventListener("click", () => {
  const open = mobileNav.style.display === "block";
  mobileNav.style.display = open ? "none" : "block";
});

mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => (mobileNav.style.display = "none"));
});

const form = document.getElementById("hForm");
const resultBox = document.getElementById("resultBox");
const copyBtn = document.getElementById("copyBtn");

function regionLabel(v){
  return {
    najd: "نجد",
    hijaz: "الحجاز",
    eastern: "الشرقية",
    south: "الجنوب",
    north: "الشمال",
  }[v] || v;
}

function occasionLabel(v){
  return {
    work: "عمل",
    wedding: "زواج/احتفال",
    casual: "كاجوال",
    formal: "رسمي",
    travel: "سفر",
  }[v] || v;
}

function styleLabel(v){
  return {
    classic: "كلاسيك",
    modern: "مودرن",
    street: "ستريت",
    minimal: "مينيمل",
  }[v] || v;
}

function genderLabel(v){
  return v === "male" ? "رجال" : v === "female" ? "نساء" : v;
}

// ديمو توصيات بسيطة (تقدر تبدلها لاحقاً بـ AI API)
function generateRecommendations({gender, region, occasion, style, colors}){
  const base = [];
  const reasons = [];

  // حسب المناسبة
  if (occasion === "work") {
    base.push("قطعة أساسية بألوان حيادية مناسبة للعمل");
    base.push("إكسسوارات بسيطة (ساعة/حزام) تعطي مظهر مرتب");
    reasons.push("اختيارات العمل تحتاج أناقة بدون مبالغة");
  } else if (occasion === "wedding") {
    base.push("إطلالة فخمة مع تفاصيل تراثية خفيفة");
    base.push("إكسسوار مميز يبرز الشخصية بدون تكلف");
    reasons.push("المناسبات تحتاج حضور قوي ولمسة هوية");
  } else if (occasion === "casual") {
    base.push("ستايل مريح مع لمسة محلية في التفاصيل");
    base.push("حذاء/شنطة عملية تناسب الحركة");
    reasons.push("الكاجوال يعتمد على الراحة مع تميّز بسيط");
  } else if (occasion === "formal") {
    base.push("إطلالة رسمية بخطوط نظيفة وألوان متناسقة");
    base.push("تفاصيل عالية الجودة (قماش/قصة) تعكس ذوقك");
    reasons.push("الرسمي يركّز على الجودة والدقة");
  } else if (occasion === "travel") {
    base.push("طبقات خفيفة تناسب تغيّر الجو");
    base.push("قطع عملية متعددة الاستخدام");
    reasons.push("السفر يحتاج مرونة وعملية");
  }

  // حسب المنطقة (لمسة هوية)
  if (region === "najd") {
    base.push("لمسات كلاسيكية تعكس طابع نجد الأصيل بشكل عصري");
    reasons.push("نجد معروفة بطابع كلاسيكي متزن");
  } else if (region === "hijaz") {
    base.push("ألوان أدفأ وتفاصيل ناعمة بطابع حجازي");
    reasons.push("الحجاز يميل للتفاصيل الناعمة والذوق المتنوع");
  } else if (region === "eastern") {
    base.push("ستايل عصري مع اهتمام بالتناسق والإكسسوارات");
    reasons.push("الشرقية تمتاز باللمسة العصرية والتنسيق");
  } else if (region === "south") {
    base.push("نقشة/تفصيل مستوحى من روح الجنوب بطريقة بسيطة");
    reasons.push("الجنوب غني بالزخارف والهوية البصرية");
  } else if (region === "north") {
    base.push("ألوان هادئة وقطع عملية تناسب أجواء الشمال");
    reasons.push("الشمال ينسجم مع ألوان هادئة ولمسات عملية");
  }

  // حسب الستايل المفضل
  if (style === "classic") {
    base.push("قصة مرتبة وألوان متوازنة");
    reasons.push("الكلاسيك يركز على البساطة والأناقة");
  } else if (style === "modern") {
    base.push("قصّات حديثة وتفاصيل minimal");
    reasons.push("المودرن يعتمد على خطوط نظيفة");
  } else if (style === "street") {
    base.push("قطعة بارزة (جاكيت/حذاء) تعطي طابع ستريت");
    reasons.push("الستريت يحتاج قطعة مميزة تقود الإطلالة");
  } else if (style === "minimal") {
    base.push("ألوان قليلة ومتناسقة بدون زحمة تفاصيل");
    reasons.push("المينيمل يبرز الذوق بالهدوء");
  }

  // تخصيص بسيط بالألوان
  base.push(`ألوان مقترحة حسب ذوقك: ${colors}`);

  // تخصيص بسيط حسب الجنس (بدون فرض)
  const note = gender === "female"
    ? "ملاحظة: التوصيات مرنة ويمكن تكييفها حسب الحشمة والذوق الشخصي."
    : "ملاحظة: التوصيات مرنة ويمكن تكييفها حسب القَصّة والتفاصيل المفضلة.";

  return {items: base.slice(0, 8), reason: [...new Set(reasons)].slice(0, 3), note};
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const gender = document.getElementById("gender").value;
  const region = document.getElementById("region").value;
  const occasion = document.getElementById("occasion").value;
  const style = document.getElementById("style").value;
  const colors = document.getElementById("colors").value.trim();

  const res = generateRecommendations({gender, region, occasion, style, colors});

  const text =
`HUWIYA AI - نتيجة التجربة (ديمو)

المدخلات:
- الجنس: ${genderLabel(gender)}
- المنطقة: ${regionLabel(region)}
- المناسبة: ${occasionLabel(occasion)}
- الستايل: ${styleLabel(style)}
- الألوان: ${colors}

اقتراحات ستايل:
${res.items.map((x,i)=> `${i+1}) ${x}`).join("\n")}

سبب الاختيار:
${res.reason.map((x,i)=> `- ${x}`).join("\n")}

${res.note}
`;
  resultBox.textContent = text;
});

copyBtn?.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(resultBox.textContent);
    copyBtn.textContent = "تم النسخ ✅";
    setTimeout(()=> (copyBtn.textContent = "نسخ النتيجة"), 1200);
  }catch(e){
    alert("تعذر النسخ. انسخ يدويًا من مربع النتيجة.");
  }
});
