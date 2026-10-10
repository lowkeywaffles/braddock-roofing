"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowsLeftRight, Camera, Check, CheckCircle, CloudLightning, Drop, Hammer, Handshake, HouseLine, MagnifyingGlass, MapPin, PaintRoller, Phone, Plus, SealCheck, Star, Wrench } from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, Wrap, flipTheme } from "@/components/kit";
import { T, useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TEL = "tel:+19729820800", PHONE = "(972) 982-0800";
const DIR = "https://www.google.com/maps/dir/?api=1&destination=7522+Campbell+Rd+Ste+113+Dallas+TX+75248";
const REVIEWS = "https://www.google.com/maps/search/?api=1&query=Braddock+Roofing+%26+Restoration+7522+Campbell+Rd+Dallas+TX";
const img = (p: string) => (process.env.NEXT_PUBLIC_BASE ?? "") + "/images/" + p;
const AREAS = ["Dallas", "North Dallas", "Richardson", "Plano", "Garland", "Addison", "Carrollton", "Farmers Branch", "Irving", "Fort Worth"];
const DYN = {
  en: { thanks: (n: string) => (n ? `Thanks, ${n}!` : "Thanks!"), more: "& across DFW", lang: "Language / Idioma", theme: "Toggle dark mode", drag: "Drag to compare before and after" },
  es: { thanks: (n: string) => (n ? `¡Gracias, ${n}!` : "¡Gracias!"), more: "y todo DFW", lang: "Idioma / Language", theme: "Cambiar modo oscuro", drag: "Arrastra para comparar antes y después" },
};
const SERVICES = [
  { k: "s1", Icon: HouseLine, cls: "md:col-span-6 md:row-span-2", big: true },
  { k: "s2", Icon: Wrench, cls: "md:col-span-6" },
  { k: "s3", Icon: CloudLightning, cls: "md:col-span-3" },
  { k: "s4", Icon: Drop, cls: "md:col-span-3" },
  { k: "s5", Icon: PaintRoller, cls: "md:col-span-6" },
  { k: "s6", Icon: Hammer, cls: "md:col-span-6" },
];
const STEPS = [["p1", MagnifyingGlass], ["p2", Camera], ["p3", Handshake], ["p4", HouseLine]] as const;

const btn = "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-[transform,background-color] duration-300 ease-spring hover:-translate-y-0.5 active:scale-[.97]";
const primary = cn(btn, "bg-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_14px_30px_-14px_var(--brand)] dark:text-[#0a0a26]");
const ghost = cn(btn, "bg-card text-ink shadow-[inset_0_0_0_1px_var(--line)]");
const eyebrow = "mb-3 block text-[13px] font-semibold tracking-[.14em] text-brand uppercase";
const fieldCls = "w-full rounded-xl border border-line bg-bg px-3.5 py-3 text-base text-ink transition-[border-color,box-shadow] duration-300 focus:border-brand focus:shadow-[0_0_0_4px_var(--tint)] focus:outline-none";

function Field({ id, k, name, type = "text", auto, required }: { id: string; k: string; name: string; type?: string; auto?: string; required?: boolean }) {
  return (
    <div><label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-soft"><T k={k} /></label>
      <input id={id} name={name} type={type} autoComplete={auto} required={required} className={fieldCls} /></div>
  );
}

/** Language: a pill with a sliding highlight. */
function LangPill() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label={DYN[lang === "es" ? "es" : "en"].lang} className="relative inline-flex rounded-full bg-card p-[3px] shadow-[inset_0_0_0_1px_var(--line)]">
      {["en", "es"].map(l => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} className={cn("relative z-10 cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors", lang === l ? "text-white dark:text-[#0a0a26]" : "text-soft")}>
          {lang === l && <motion.span layoutId="lang" className="absolute inset-0 -z-10 rounded-full bg-brand" transition={{ type: "spring", stiffness: 500, damping: 34 }} />}
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/** Theme: a little sky. Day has the sun and a cloud; night brings the moon and stars. */
function Sky() {
  const { resolvedTheme, setTheme } = useTheme();
  const { lang } = useLang();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const night = ready && resolvedTheme === "dark";
  return (
    <button type="button" aria-label={DYN[lang === "es" ? "es" : "en"].theme} aria-pressed={night}
      onClick={e => flipTheme(e.currentTarget, () => flushSync(() => setTheme(night ? "light" : "dark")))}
      className={cn("relative h-8 w-[62px] flex-none cursor-pointer overflow-hidden rounded-full shadow-[inset_0_0_0_1px_var(--line)] transition-[background] duration-500",
        night ? "bg-[linear-gradient(180deg,#0b1633,#1b2c47)]" : "bg-[linear-gradient(180deg,#8fd8ff,#d7f2ff)]")}>
      <span className="absolute top-2 left-3 size-1 rounded-full bg-white transition-opacity duration-500" style={{ opacity: night ? 1 : 0, boxShadow: "9px 10px 0 -1px #fff, 18px 2px 0 -1px #fff" }} />
      <span className="absolute right-[7px] bottom-1.5 h-2 w-4 rounded-full bg-white/90 transition-all duration-500" style={{ opacity: night ? 0 : 1, transform: night ? "translateX(10px)" : "none" }} />
      <motion.span animate={{ x: night ? 30 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={cn("absolute top-[3px] left-[3px] size-6 overflow-hidden rounded-full transition-[background,box-shadow] duration-500",
          night ? "bg-[radial-gradient(circle_at_35%_35%,#fff,#d6dff0)] shadow-[0_0_12px_rgba(214,223,240,.6)]" : "bg-[radial-gradient(circle_at_35%_35%,#ffe38a,#ffc629)] shadow-[0_0_12px_rgba(255,198,41,.8)]")}>
        <span className="absolute -top-[3px] left-3.5 size-5 rounded-full bg-[#1b2c47] transition-transform duration-500" style={{ transform: night ? "scale(1)" : "scale(0)" }} />
      </motion.span>
    </button>
  );
}

/** Before/after: drag the handle across the same house. */
function Compare() {
  const t = useT();
  const { lang } = useLang();
  const [x, setX] = useState(50);
  return (
    <div className="bezel relative aspect-[526/254] overflow-hidden rounded-[28px] max-sm:aspect-[4/3]">
      <div className="relative size-full overflow-hidden rounded-[23px]">
        <img src={img("before.webp")} alt={t("alt:altBefore")} className="absolute inset-0 size-full object-cover" />
        <img src={img("after.webp")} alt={t("alt:altAfter")} className="absolute inset-0 size-full object-cover" style={{ clipPath: `inset(0 0 0 ${x}%)` }} />
        <T k="lblBefore" className="absolute top-4 left-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur" />
        <T k="lblAfter" className="absolute top-4 right-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white dark:text-[#0a0a26]" />
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.15)]" style={{ left: `${x}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#141833] shadow-lg"><ArrowsLeftRight size={20} weight="bold" /></span>
        </div>
        <input type="range" min={0} max={100} value={x} onChange={e => setX(+e.target.value)} aria-label={DYN[lang === "es" ? "es" : "en"].drag}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0" />
      </div>
    </div>
  );
}

export default function Home() {
  const t = useT();
  const { lang } = useLang();
  const L = lang === "es" ? "es" : "en";
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState<string | null>(null);
  const steps = useRef<HTMLDivElement>(null);

  // the claim timeline draws itself as you read down it
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".track", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: steps.current, start: "top 75%", end: "bottom 55%", scrub: true } });
    });
  }, { scope: steps });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.reportValidity()) return;
    setSent(String(new FormData(f).get("name") ?? "").trim().split(" ")[0]);
  };

  return (
    <>
      <header className="pointer-events-none sticky top-3 z-40 px-4">
        <nav className="glass pointer-events-auto mx-auto flex h-[70px] max-w-[1180px] items-center justify-between gap-3 rounded-full border border-line ps-6 pe-2.5 shadow-[inset_0_1px_0_var(--hi),0_20px_50px_-28px_var(--shadow)]">
          <a href="#top" className="flex-none leading-none" aria-label="Braddock Roofing & Restoration">
            <b className="block font-display text-[26px] font-extrabold tracking-tight text-brand">Braddock</b>
            <T k="logoSub" className="block text-[12px] font-medium text-soft italic" />
          </a>
          <div className="flex items-center gap-1 text-[15px] font-medium max-[1000px]:hidden">
            {[["services", "navServices"], ["insurance", "navInsurance"], ["contact", "navContact"]].map(([id, k]) => <a key={id} href={`#${id}`} className="rounded-full px-4 py-2 text-soft transition-colors hover:bg-bg2 hover:text-ink" dangerouslySetInnerHTML={{ __html: t(k) }} />)}
          </div>
          <div className="flex items-center gap-2.5">
            <LangPill /><Sky />
            <a href={TEL} className={cn(primary, "px-5 py-2.5 max-sm:hidden")}><Phone size={17} weight="bold" />{PHONE}</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative overflow-hidden pt-16 pb-24 max-sm:pt-10">
          <div className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[640px] rounded-full bg-[radial-gradient(closest-side,var(--tint),transparent)]" />
          <Wrap className="grid grid-cols-[1.05fr_.95fr] items-center gap-14 max-[1000px]:grid-cols-1">
            <div>
              <Reveal className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-card py-1 ps-1 pe-4 shadow-[inset_0_0_0_1px_var(--line)]">
                <T k="badgeTag" className="rounded-full bg-brand px-3 py-1 text-xs font-bold text-white dark:text-[#0a0a26]" /><T k="badgeText" className="text-sm font-medium text-soft" />
              </Reveal>
              <Reveal delay={0.08}><T k="heroTitle" as="h1" className="mb-6 text-[clamp(48px,6vw,84px)] leading-[.98] [&_em]:text-brand [&_em]:italic" /></Reveal>
              <Reveal delay={0.16}><T k="heroLead" as="p" className="mb-9 max-w-[50ch] text-lg text-soft" /></Reveal>
              <Reveal delay={0.24} className="flex flex-wrap gap-3">
                <a href="#contact" className={primary}><T k="ctaInspect" /></a>
                <a href={TEL} className={ghost}><Phone size={18} weight="bold" /><T k="callNowLong" /></a>
              </Reveal>
              <Reveal delay={0.3} className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-8 max-sm:grid-cols-1">
                {([["trustFree", CheckCircle], ["trustGoogle", Star], ["trustInsured", SealCheck], ["trustBbb", Check]] as const).map(([k, I]) => (
                  <div key={k} className="flex items-start gap-3"><span className="grid size-9 flex-none place-items-center rounded-xl bg-tint text-brand"><I size={18} weight="bold" /></span><T k={k} className="text-sm text-soft [&_strong]:block [&_strong]:text-[15px] [&_strong]:text-ink" /></div>
                ))}
              </Reveal>
            </div>
            <Reveal delay={0.2} className="relative">
              <div className="bezel rotate-1 rounded-[32px] shadow-[0_50px_100px_-50px_var(--shadow)] max-sm:rotate-0">
                <div className="relative aspect-[4/3.4] overflow-hidden rounded-[26px]">
                  <img src={img("install.webp")} alt={t("alt:altInstall")} fetchPriority="high" className="size-full object-cover" />
                  <div className="rain absolute inset-0" aria-hidden="true" />
                </div>
              </div>
              {([["floatClaims", SealCheck, "-left-8 bottom-16 -rotate-2"], ["floatRating", Star, "-right-4 -top-5 rotate-2"]] as const).map(([k, I, pos]) => (
                <div key={k} className={cn("glass absolute flex items-center gap-3 rounded-2xl py-3 ps-3 pe-5 shadow-[inset_0_0_0_1px_var(--line),0_24px_50px_-20px_var(--shadow)] max-sm:hidden", pos)}>
                  <span className="grid size-10 place-items-center rounded-xl bg-brand text-white dark:text-[#0a0a26]"><I size={20} weight="fill" /></span>
                  <T k={k} className="text-[15px] font-semibold [&_small]:block [&_small]:text-[13px] [&_small]:font-normal [&_small]:text-soft" />
                </div>
              ))}
            </Reveal>
          </Wrap>
        </section>

        <div className="border-y border-line bg-card py-5" aria-hidden="true">
          <Marquee className="[--duration:30s] [--gap:3rem]">
            {["strip1", "strip2", "strip3", "strip4", "s4t", "s5t", "s6t"].map(k => (
              <span key={k} className="flex items-center gap-12 font-display text-2xl font-bold text-ink"><T k={k} /><HouseLine size={20} className="text-brand" /></span>
            ))}
          </Marquee>
        </div>

        <section id="services" className="scroll-mt-24 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-14 max-w-[720px]">
              <T k="svcEyebrow" className={eyebrow} /><T k="svcTitle" as="h2" className="mb-4 text-[clamp(42px,5.6vw,72px)]" /><T k="svcLead" as="p" className="max-w-[58ch] text-[17px] text-soft" />
            </Reveal>
            <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-12">
              {SERVICES.map(({ k, Icon, cls, big }, i) => (
                <Reveal key={k} delay={(i % 3) * 0.06} className={cn("bezel rounded-[26px] transition-transform duration-500 ease-silk hover:-translate-y-1", cls)}>
                  <MagicCard gradientSize={260} gradientColor="rgba(38,38,176,.1)" gradientFrom="#5b5bff" gradientTo="#2626b0" className="h-full rounded-[21px] [&>div:last-child]:h-full">
                    <div className={cn("relative flex h-full flex-col justify-between gap-8 p-7", big && "bg-slate p-10 text-white")}>
                      <div className="flex items-start justify-between">
                        <span className={cn("grid place-items-center rounded-2xl", big ? "size-16 bg-white/10 text-white" : "size-12 bg-tint text-brand")}><Icon size={big ? 32 : 24} weight="duotone" /></span>
                        {big && <T k="tagCore" className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold" />}
                      </div>
                      <div>
                        <T k={`${k}t`} as="h3" className={cn("mb-2", big ? "text-[clamp(40px,4.4vw,60px)]" : "text-[26px]")} />
                        <T k={`${k}p`} as="p" className={cn("max-w-[44ch] text-[15px]", big ? "text-[17px] text-white/70" : "text-soft")} />
                      </div>
                    </div>
                  </MagicCard>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="work" className="bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <div className="grid grid-cols-[1.2fr_.8fr] items-center gap-14 max-[1000px]:grid-cols-1">
              <Reveal><Compare /></Reveal>
              <Reveal delay={0.1}>
                <T k="baEyebrow" className={eyebrow} /><T k="baTitle" as="h2" className="mb-4 text-[clamp(42px,5vw,64px)]" />
                <T k="baLead" as="p" className="mb-6 text-soft" />
                <ul className="grid gap-3">{["baL1", "baL2", "baL3"].map(k => <li key={k} className="flex items-center gap-3 font-medium"><span className="grid size-6 place-items-center rounded-full bg-brand text-white dark:text-[#0a0a26]"><Check size={13} weight="bold" /></span><T k={k} /></li>)}</ul>
              </Reveal>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 max-sm:grid-cols-1">
              {["home-1.webp", "home-2.webp", "home-3.webp"].map((f, i) => (
                <Reveal key={f} delay={i * 0.06} className="bezel group rounded-[24px]">
                  <figure>
                    <div className="overflow-hidden rounded-[19px]"><img src={img(f)} alt={t(`alt:altHome${i + 1}`)} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-105" /></div>
                    <T k="capHome" as="figcaption" className="px-2 pt-2.5 pb-1 text-sm text-soft" />
                  </figure>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="insurance" className="scroll-mt-24 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-16 max-w-[760px]">
              <T k="insEyebrow" className={eyebrow} /><T k="insTitle" as="h2" className="mb-4 text-[clamp(42px,5.6vw,72px)]" /><T k="insLead" as="p" className="max-w-[60ch] text-[17px] text-soft" />
            </Reveal>
            <div ref={steps} className="relative grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
              <div className="absolute inset-x-[6%] top-7 h-0.5 bg-line max-[900px]:hidden"><div className="track h-full origin-left bg-brand rtl:origin-right" /></div>
              {STEPS.map(([k, Icon], i) => (
                <Reveal key={k} delay={i * 0.08} className="relative">
                  <span className="relative mb-6 grid size-14 place-items-center rounded-2xl bg-brand text-white shadow-[0_0_0_8px_var(--bg)] dark:text-[#0a0a26]"><Icon size={26} weight="duotone" /></span>
                  <span className="mb-1 block text-xs font-semibold tracking-[.14em] text-soft uppercase">0{i + 1}</span>
                  <T k={`${k}t`} as="h3" className="mb-2 text-[26px]" />
                  <T k={`${k}p`} as="p" className="text-[15px] text-soft" />
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="bg-bg2 py-32 max-sm:py-20">
          <Wrap className="grid grid-cols-[1.1fr_.9fr] items-start gap-14 max-[1000px]:grid-cols-1">
            <Reveal>
              <T k="whyEyebrow" className={eyebrow} /><T k="whyTitle" as="h2" className="mb-10 text-[clamp(42px,5vw,64px)]" />
              <div className="grid gap-6">
                {["w1", "w2", "w3", "w4", "w5"].map(k => (
                  <div key={k} className="flex gap-4"><span className="mt-1 grid size-7 flex-none place-items-center rounded-full bg-tint text-brand"><Check size={15} weight="bold" /></span>
                    <div><T k={`${k}t`} as="h3" className="mb-1 font-sans text-lg font-bold tracking-normal" /><T k={`${k}p`} as="p" className="text-[15px] text-soft" /></div></div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative overflow-hidden rounded-[32px] bg-slate p-10 text-white shadow-[0_50px_100px_-50px_var(--shadow)] max-sm:p-7">
              <BorderBeam size={240} duration={10} colorFrom="#8b8bff" colorTo="#2626b0" borderWidth={1.5} />
              <div className="mb-2 flex items-end gap-4"><b className="font-display text-[96px] leading-none">5.0</b><span className="mb-3 text-2xl tracking-[3px] text-[#ffc629]">★★★★★</span></div>
              <T k="revSub" as="p" className="mb-8 text-white/70" />
              <T k="revEyebrow" className="mb-3 block text-[13px] font-semibold tracking-[.14em] text-[#a3a3ff] uppercase" />
              <div className="mb-8 flex flex-wrap gap-2">{["th1", "th2", "th3", "th4", "th5", "th6"].map(k => <T key={k} k={k} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm" />)}</div>
              <a href={REVIEWS} target="_blank" rel="noopener" className="font-semibold text-[#a3a3ff] underline-offset-4 hover:underline" dangerouslySetInnerHTML={{ __html: t("revLink") }} />
            </Reveal>
          </Wrap>
        </section>

        <section className="py-24 max-sm:py-16">
          <Wrap>
            <Reveal className="mb-8"><T k="areaEyebrow" className={eyebrow} /><T k="areaTitle" as="h2" className="text-[clamp(36px,4.4vw,54px)]" /></Reveal>
            <Reveal className="flex flex-wrap gap-2.5">
              {[...AREAS, DYN[L].more].map(a => <span key={a} className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2.5 font-medium shadow-[inset_0_0_0_1px_var(--line)]"><MapPin size={16} weight="fill" className="text-brand" />{a}</span>)}
            </Reveal>
          </Wrap>
        </section>

        <section id="contact" className="scroll-mt-24 bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12 max-w-[720px]"><T k="ctEyebrow" className={eyebrow} /><T k="ctTitle" as="h2" className="mb-4 text-[clamp(42px,5.6vw,72px)]" /><T k="ctLead" as="p" className="text-[17px] text-soft" /></Reveal>
            <div className="grid grid-cols-[1.1fr_.9fr] gap-5 max-[1000px]:grid-cols-1">
              <Reveal className="bezel rounded-[30px]">
                <div className="relative min-h-[520px] overflow-hidden rounded-[25px] bg-card p-9 max-sm:p-6">
                  <AnimatePresence mode="wait">
                    {sent === null ? (
                      <motion.form key="f" noValidate onSubmit={submit} exit={{ opacity: 0, y: -20 }} className="grid gap-4">
                        <T k="formTitle" as="h3" className="text-[32px]" /><T k="formLead" as="p" className="-mt-2 mb-2 text-soft" />
                        <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
                          <Field id="f-name" k="fName" name="name" auto="name" required /><Field id="f-phone" k="fPhone" name="phone" type="tel" auto="tel" required />
                        </div>
                        <Field id="f-addr" k="fAddr" name="address" auto="street-address" />
                        <div><label htmlFor="f-need" className="mb-1.5 block text-[13px] font-semibold text-soft"><T k="fNeed" /></label>
                          <select id="f-need" name="need" className={fieldCls}>{[0, 1, 2, 3, 4, 5, 6].map(n => <option key={n} dangerouslySetInnerHTML={{ __html: t(`o${n}`) }} />)}</select></div>
                        <div><label htmlFor="f-msg" className="mb-1.5 block text-[13px] font-semibold text-soft"><T k="fMsg" /></label><textarea id="f-msg" name="message" className={cn(fieldCls, "min-h-28")} /></div>
                        <div className="flex flex-wrap items-center gap-4"><button type="submit" className={cn(primary, "cursor-pointer")}><T k="fSend" /></button><T k="fNote" className="text-[13px] text-soft" /></div>
                      </motion.form>
                    ) : (
                      <motion.div key="ok" role="status" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="grid h-full min-h-[440px] place-content-center justify-items-center text-center">
                        <span className="mb-6 grid size-20 place-items-center rounded-full bg-brand text-white dark:text-[#0a0a26]"><Check size={40} weight="bold" /></span>
                        <h3 className="mb-2 text-[40px]">{DYN[L].thanks(sent)}</h3><T k="successText" as="p" className="max-w-[36ch] text-soft" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
              <Reveal delay={0.08} className="flex flex-col gap-4">
                {([[TEL, Phone, PHONE, "callSmall"], [DIR, MapPin, "7522 Campbell Rd, Ste 113-117", null]] as const).map(([href, I, strong, sub]) => (
                  <a key={strong} href={href} target={sub ? undefined : "_blank"} rel="noopener" className="group flex items-center gap-4 rounded-[22px] bg-card p-5 shadow-[inset_0_0_0_1px_var(--line)]">
                    <span className="grid size-12 flex-none place-items-center rounded-2xl bg-brand text-white transition-transform duration-300 ease-spring group-hover:scale-110 dark:text-[#0a0a26]"><I size={22} weight="bold" /></span>
                    <span><strong className="block text-lg">{strong}</strong>{sub ? <T k={sub} className="text-sm text-soft" /> : <span className="text-sm text-soft">Dallas, TX 75248</span>}</span>
                  </a>
                ))}
                <div className="bezel min-h-[300px] flex-1 overflow-hidden rounded-[26px]">
                  <iframe title="Map to Braddock Roofing & Restoration" loading="lazy" className="size-full min-h-[288px] rounded-[21px] border-0 [filter:var(--map)]" src={`https://maps.google.com/maps?q=7522+Campbell+Rd+Ste+113,+Dallas,+TX+75248&z=14&output=embed&hl=${lang}`} />
                </div>
              </Reveal>
            </div>
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap className="grid grid-cols-[.8fr_1.2fr] gap-14 max-[1000px]:grid-cols-1">
            <Reveal><T k="faqEyebrow" className={eyebrow} /><T k="faqTitle" as="h2" className="text-[clamp(42px,5vw,64px)]" /></Reveal>
            <div className="grid gap-3">
              {[0, 1, 2, 3, 4].map(i => (
                <Reveal key={i} delay={i * 0.04} className="rounded-2xl bg-card shadow-[inset_0_0_0_1px_var(--line)]">
                  <button type="button" onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i} className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-start text-[17px] font-semibold">
                    <T k={`q${i}`} /><Plus size={20} weight="bold" className="flex-none text-brand transition-transform duration-400 ease-spring" style={{ transform: faq === i ? "rotate(45deg)" : "none" }} />
                  </button>
                  <AnimatePresence initial={false}>
                    {faq === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }} className="overflow-hidden"><T k={`a${i}`} as="p" className="px-6 pb-5 text-soft" /></motion.div>}
                  </AnimatePresence>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="pb-32 max-sm:pb-20">
          <Wrap>
            <Reveal className="relative flex items-center justify-between gap-8 overflow-hidden rounded-[36px] bg-slate px-14 py-20 text-white max-[1000px]:flex-col max-[1000px]:items-start max-sm:px-7 max-sm:py-14">
              <div className="rain absolute inset-0 opacity-25" aria-hidden="true" />
              <div className="relative">
                <T k="ctaTag" className="mb-4 inline-block rounded-full bg-white/12 px-3.5 py-1 text-sm font-semibold" />
                <T k="ctaTitle" as="h2" className="mb-3 text-[clamp(44px,6vw,80px)]" /><T k="ctaLead" as="p" className="text-lg text-white/70" />
              </div>
              <a href={TEL} className={cn(btn, "relative flex-none bg-white px-7 py-4 text-lg text-[#2626b0]")}><Phone size={20} weight="bold" /><T k="ctaBtn" /></a>
            </Reveal>
          </Wrap>
        </section>
      </main>

      <footer className="pb-28">
        <Wrap><div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7 text-sm text-soft">
          <span className="leading-none"><b className="block font-display text-xl text-brand">Braddock</b><T k="logoSub" className="text-xs italic" /></span>
          <span>© {new Date().getFullYear()} Braddock Roofing &amp; Restoration · 7522 Campbell Rd, Ste 113-117, Dallas, TX 75248 · <a href={TEL}>{PHONE}</a></span>
        </div></Wrap>
      </footer>
      <div className="glass fixed inset-x-3 bottom-3 z-30 hidden gap-2 rounded-full p-1.5 shadow-[inset_0_0_0_1px_var(--line)] max-sm:flex">
        <a href={TEL} className={cn(primary, "flex-1 py-3")}><T k="callShort" /></a>
        <a href="#contact" className={cn(ghost, "flex-1 py-3")}><T k="inspectShort" /></a>
      </div>
    </>
  );
}
