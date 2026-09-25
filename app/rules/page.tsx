"use client";

import { useState } from "react";
import { Languages } from "lucide-react";

export default function RulesPage() {
const [language, setLanguage] = useState<"en" | "ar">("en");

const isArabic = language === "ar";

const content = {
en: {
mazad: "Mazad",
pageTitle: "Auction Terms and Conditions",
description:
"Please read these terms and conditions carefully before registering or participating in the auction.",
participationRequirement: "Participation Requirement",
depositTitle: "$100 Participation Deposit",
depositDescription: "Required before participating in the auction.",
important: "Important",
acceptanceTitle: "Participation means acceptance",
acceptanceDescription:
"By registering and participating in the auction, you confirm that you have read, understood, and agreed to these auction terms and conditions.",

  rules: [
    {
      number: "01",
      title: "Registration",
      content:
        "Any person may register and participate in the auction after presenting a valid personal identification document and providing their required information.",
    },
    {
      number: "02",
      title: "Participation Deposit",
      content:
        "Each bidder must pay a $100 deposit to participate before the auction begins.",
      list: [
        "The deposit will be fully refunded to any bidder who does not win any item, according to the refund procedure approved by the auction management.",
        "If the bidder wins one or more items, the deposit will be deducted from the total amount due.",
        "If a bidder wins an item but refuses to pay for or collect their purchases, the auction management reserves the right to retain the deposit in accordance with the announced terms and conditions.",
      ],
    },
    {
      number: "03",
      title: "Auction Without a Minimum Price",
      content:
        "All items offered for sale at the auction will be sold to the highest bidder. There is no reserve price or minimum price unless otherwise clearly stated before the item is offered for bidding.",
    },
    {
      number: "04",
      title: "Inspection",
      content:
        "Bidders are responsible for inspecting items before placing a bid and verifying their condition and specifications. Placing a bid constitutes acceptance to purchase the item in its inspected condition.",
    },
    {
      number: "05",
      title: "Binding Bids",
      content:
        "Once the auctioneer declares the bidding closed and awards the item to the highest bidder, the bid becomes binding and the buyer may not withdraw from the purchase.",
    },
    {
      number: "06",
      title: "Bidder Errors",
      content:
        "Bidders are responsible for ensuring the accuracy of the amount they bid before submitting it. Any bid recorded and accepted by the auctioneer is binding unless the auctioneer immediately decides to cancel it due to an obvious error.",
    },
    {
      number: "07",
      title: "Auctioneer's Decision",
      content:
        "The auctioneer's decision regarding the winning bidder and the awarding of an item is final. The auctioneer reserves the right to reopen bidding in the event of an obvious error or dispute during the bidding process.",
    },
    {
      number: "08",
      title: "Payment",
      content:
        "The full amount for all purchases must be paid within the period specified by the auction management and using the payment method announced before the auction begins.",
    },
    {
      number: "09",
      title: "Collection of Items",
      content:
        "No item will be released or handed over until its full value has been paid.",
    },
    {
      number: "10",
      title: "Failure to Pay",
      content:
        "If a bidder fails to pay for the items they have won within the specified deadline, the auction management reserves the right to cancel the sale and take the actions provided for in the auction terms and conditions, including using the participation deposit in accordance with the announced terms.",
    },
    {
      number: "11",
      title: "Bidding on Behalf of Another Person",
      content:
        "No person may bid on behalf of another person without registration and approval from the auction management.",
    },
    {
      number: "12",
      title: "Transparency and Fair Bidding",
      content:
        "Bidders are prohibited from making agreements with other bidders to manipulate prices or bidding. The auction management reserves the right to cancel the participation of any person found to have engaged in such conduct.",
    },
    {
      number: "13",
      title: "Fees",
      content:
        "If any commission or additional fees are charged to the buyer, they must be clearly announced before the auction begins.",
    },
    {
      number: "14",
      title: "Acceptance of Terms",
      content:
        "By registering and participating in the auction, the bidder acknowledges that they have read, understood, and agreed to all the auction terms and conditions.",
    },
  ],
},

ar: {
  mazad: "مزاد",
  pageTitle: "شروط وأحكام المزاد",
  description:
    "يرجى قراءة هذه الشروط والأحكام بعناية قبل التسجيل أو المشاركة في المزاد.",
  participationRequirement: "شرط المشاركة",
  depositTitle: "تأمين المشاركة 100 دولار",
  depositDescription: "مطلوب دفعه قبل المشاركة في المزاد.",
  important: "مهم",
  acceptanceTitle: "المشاركة تعني الموافقة",
  acceptanceDescription:
    "من خلال التسجيل والمشاركة في المزاد، فإنك تؤكد أنك قرأت وفهمت ووافقت على جميع شروط وأحكام المزاد.",

  rules: [
    {
      number: "01",
      title: "التسجيل",
      content:
        "يحق لأي شخص التسجيل والمشاركة في المزاد بعد إبراز هوية شخصية صالحة وتسجيل البيانات المطلوبة.",
    },
    {
      number: "02",
      title: "تأمين المشاركة",
      content:
        "يدفع كل مزايد مبلغ 100 دولار كتأمين للمشاركة قبل بدء المزاد.",
      list: [
        "يُعاد التأمين كاملًا للمزايد الذي لم يفز بأي قطعة، وفق آلية الاسترداد المعتمدة من إدارة المزاد.",
        "في حال فوز المزايد بقطعة واحدة أو أكثر، يتم احتساب مبلغ التأمين ضمن المبلغ الإجمالي المستحق.",
        "في حال فوز المزايد بقطعة وامتناعه عن الدفع أو استلام مشترياته، يحق لإدارة المزاد الاحتفاظ بمبلغ التأمين وفقًا للشروط والأحكام المعلنة.",
      ],
    },
    {
      number: "03",
      title: "المزاد دون سعر أدنى",
      content:
        "تُباع جميع القطع المعروضة في المزاد لأعلى مزايد، ولا يوجد سعر احتياطي أو حد أدنى للسعر ما لم يتم الإعلان عن ذلك بشكل واضح قبل عرض القطعة للمزايدة.",
    },
    {
      number: "04",
      title: "المعاينة",
      content:
        "يتحمل المزايد مسؤولية معاينة القطع قبل تقديم المزايدة والتحقق من حالتها ومواصفاتها. ويُعد تقديم المزايدة موافقة على شراء القطعة بالحالة التي تمت معاينتها عليها.",
    },
    {
      number: "05",
      title: "المزايدات الملزمة",
      content:
        "بعد إعلان إغلاق المزايدة وترسية القطعة على أعلى مزايد، تصبح المزايدة ملزمة ولا يحق للمشتري التراجع عن الشراء.",
    },
    {
      number: "06",
      title: "أخطاء المزايد",
      content:
        "يتحمل المزايد مسؤولية التأكد من صحة المبلغ الذي يقدمه قبل تسجيل المزايدة. وتُعد أي مزايدة يتم تسجيلها وقبولها من قبل إدارة المزاد ملزمة، ما لم تقرر الإدارة فورًا إلغاؤها بسبب خطأ واضح.",
    },
    {
      number: "07",
      title: "قرار إدارة المزاد",
      content:
        "يُعد قرار إدارة المزاد بشأن تحديد المزايد الفائز وترسية القطعة قرارًا نهائيًا. ويحق لإدارة المزاد إعادة فتح المزايدة في حال وجود خطأ واضح أو نزاع أثناء عملية المزايدة.",
    },
    {
      number: "08",
      title: "الدفع",
      content:
        "يجب دفع كامل قيمة المشتريات خلال المدة التي تحددها إدارة المزاد وبطريقة الدفع المعلن عنها قبل بدء المزاد.",
    },
    {
      number: "09",
      title: "استلام القطع",
      content:
        "لا يتم تسليم أو الإفراج عن أي قطعة قبل سداد قيمتها بالكامل.",
    },
    {
      number: "10",
      title: "عدم الدفع",
      content:
        "في حال عدم قيام المزايد بدفع قيمة القطع التي فاز بها ضمن المهلة المحددة، يحق لإدارة المزاد إلغاء البيع واتخاذ الإجراءات المنصوص عليها في شروط وأحكام المزاد، بما في ذلك استخدام مبلغ تأمين المشاركة وفقًا للشروط المعلنة.",
    },
    {
      number: "11",
      title: "المزايدة نيابة عن شخص آخر",
      content:
        "لا يجوز لأي شخص المزايدة نيابة عن شخص آخر دون التسجيل والحصول على موافقة إدارة المزاد.",
    },
    {
      number: "12",
      title: "الشفافية ونزاهة المزايدة",
      content:
        "يُمنع على المزايدين عقد أي اتفاقات مع مزايدين آخرين بهدف التأثير على الأسعار أو التلاعب بالمزايدة. ويحق لإدارة المزاد إلغاء مشاركة أي شخص يثبت قيامه بمثل هذا السلوك.",
    },
    {
      number: "13",
      title: "الرسوم",
      content:
        "في حال وجود أي عمولة أو رسوم إضافية يتحملها المشتري، يجب الإعلان عنها بشكل واضح قبل بدء المزاد.",
    },
    {
      number: "14",
      title: "الموافقة على الشروط",
      content:
        "من خلال التسجيل والمشاركة في المزاد، يقر المزايد بأنه قرأ وفهم ووافق على جميع شروط وأحكام المزاد.",
    },
  ],
},

};

const current = content[language];

const toggleLanguage = () => {
setLanguage((prev) => (prev === "en" ? "ar" : "en"));
};

return (
<main
dir={isArabic ? "rtl" : "ltr"}
className="min-h-screen bg-[#f7f8fb]"
>
{/* Language Button */}
    <button
    onClick={toggleLanguage}
    aria-label="Switch language"
    title={isArabic ? "Switch to English" : "التبديل إلى العربية"}
    className="absolute right-8 top-[70px] z-10 grid h-8 w-8 place-items-center rounded-md bg-[#101316] text-white shadow-sm transition hover:bg-[#0f766e]"
    >
    <Languages size={22} />
    </button>


<section className="relative mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

    {/* Header */}
    <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#0f766e]">
        {current.mazad}
      </p>

      <h1 className="mt-3 pr-16 text-4xl font-semibold leading-tight text-[#101316] sm:text-5xl">
        {current.pageTitle}
      </h1>

      <p className="mt-5 max-w-3xl text-base leading-7 text-[#59636d]">
        {current.description}
      </p>
    </div>

    {/* Deposit Highlight */}
    <div className="mt-6 rounded-lg border border-[#0f766e]/20 bg-[#0f766e]/5 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#0f766e]">
        {current.participationRequirement}
      </p>

      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#101316]">
            {current.depositTitle}
          </h2>

          <p className="mt-1 text-sm leading-6 text-[#59636d]">
            {current.depositDescription}
          </p>
        </div>

        <div className="text-3xl font-semibold text-[#0f766e]">$100</div>
      </div>
    </div>

    {/* Rules */}
    <div className="mt-6 space-y-4">
      {current.rules.map((rule) => (
        <article
          key={rule.number}
          className="rounded-lg border border-black/10 bg-white p-5 shadow-sm transition sm:p-6"
        >
          <div className="flex gap-4">
            {/* Number */}
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#101316] text-sm font-semibold text-white">
              {rule.number}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-[#101316]">
                {rule.title}
              </h2>

              <div className="mt-3 text-sm leading-7 text-[#59636d]">
                <p>{rule.content}</p>

                {rule.list && (
                  <ul className="mt-4 space-y-3">
                    {rule.list.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-sm bg-[#0f766e]" />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* Acceptance Notice */}
    <div className="mt-8 rounded-lg border border-black/10 bg-[#101316] p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#0f766e]">
        {current.important}
      </p>

      <h2 className="mt-3 text-2xl font-semibold text-white">
        {current.acceptanceTitle}
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
        {current.acceptanceDescription}
      </p>
    </div>
  </section>
</main>
  );
}
