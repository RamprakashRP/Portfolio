'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { RefreshCw, CalendarDays, History, Plane, ChevronDown, Calendar, Clock } from 'lucide-react';
import TickerNumber from '@/components/TickerNumber';

const BIRTH_DATE = new Date('2004-08-17T05:30:00+05:30'); 

const DUBAI_ARRIVAL = new Date('2026-01-07T16:00:00+04:00');
const DUBAI_DEPARTURE = new Date('2026-01-13T12:30:00+04:00'); 
const DUBAI_DURATION_MS = DUBAI_DEPARTURE.getTime() - DUBAI_ARRIVAL.getTime();

const CANADA_LANDING = new Date('2026-08-12T09:30:00-04:00');

type TimeUnit = 'detailed' | 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' | 'date';

const TIME_UNITS = [
  { id: 'detailed', label: 'Detailed' },
  { id: 'seconds', label: 'Sec' },
  { id: 'minutes', label: 'Min' },
  { id: 'hours', label: 'Hr' },
  { id: 'days', label: 'Day' },
  { id: 'months', label: 'Mo' },
  { id: 'years', label: 'Yr' },
  { id: 'date', label: 'Date' },
] as const;

// Helper Functions
const getDetailedDuration = (ms: number) => {
  if (ms < 0) ms = 0;
  const years = Math.floor(ms / 31556952000);
  ms %= 31556952000;
  const months = Math.floor(ms / 2629746000);
  ms %= 2629746000;
  const weeks = Math.floor(ms / 604800000);
  ms %= 604800000;
  const days = Math.floor(ms / 86400000);
  ms %= 86400000;
  const hours = Math.floor(ms / 3600000);
  ms %= 3600000;
  const minutes = Math.floor(ms / 60000);
  ms %= 60000;
  const seconds = Math.floor(ms / 1000);
  return { years, months, weeks, days, hours, minutes, seconds };
};

const formatDuration = (ms: number, selectedUnit: TimeUnit) => {
  if (ms < 0) ms = 0; 
  switch (selectedUnit) {
    case 'seconds': return (ms / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 });
    case 'minutes': return (ms / (1000 * 60)).toLocaleString(undefined, { maximumFractionDigits: 2 });
    case 'hours': return (ms / (1000 * 60 * 60)).toLocaleString(undefined, { maximumFractionDigits: 2 });
    case 'days': return (ms / (1000 * 60 * 60 * 24)).toLocaleString(undefined, { maximumFractionDigits: 2 });
    case 'months': return (ms / (1000 * 60 * 60 * 24 * 30.44)).toLocaleString(undefined, { maximumFractionDigits: 4 });
    case 'years': return (ms / (1000 * 60 * 60 * 24 * 365.25)).toLocaleString(undefined, { maximumFractionDigits: 6 });
    default: return '0';
  }
};

const formatDateObj = (d: Date) => {
  return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
};

// Sub-component for each Country Card to manage its own state
const LocationCard = ({
  country,
  flagCode,
  badge,
  badgeColor,
  activeTitle,
  activeIcon: ActiveIcon,
  activeMs,
  activeDate, // The specific date counting from/to
  isPlaceholder = false,
  staticDetails,
  isRowLayout,
  isDesktop,
  layoutClass,
}: {
  country: string;
  flagCode: string;
  badge: string;
  badgeColor: string;
  activeTitle: string;
  activeIcon: any;
  activeMs: number;
  activeDate?: Date | null;
  isPlaceholder?: boolean;
  staticDetails?: {
    title: string;
    icon: any;
    ms: number | null;
    fromDate?: Date | null;
    toDate?: Date | null;
    dateRanges?: { from: Date; to: Date | null }[];
  }[];
  isRowLayout: boolean;
  isDesktop: boolean;
  layoutClass?: string;
}) => {
  const [unit, setUnit] = useState<TimeUnit>('detailed');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tickerHeight = (isDesktop && !isRowLayout) ? 40 : 80;
  const colonClass = `text-neutral-700 font-light mb-6 ${tickerHeight === 40 ? 'text-2xl' : 'text-4xl'}`;
  const labelClass = `text-[10px] uppercase tracking-wider text-neutral-500 font-semibold ${tickerHeight === 40 ? '' : 'md:text-xs'}`;
  const flexClass = tickerHeight === 40 ? 'gap-x-1 gap-y-4 justify-center' : 'gap-x-2 md:gap-x-4 gap-y-6';

  const ActiveTimeDisplay = () => {
    if (isPlaceholder) {
      return <div className="text-4xl font-mono text-neutral-600 font-bold">-</div>;
    }

    if (unit === 'date') {
      return (
        <div className={`font-semibold text-white tracking-wide mt-2 ${tickerHeight === 40 ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'}`}>
          {activeDate ? formatDateObj(activeDate) : '-'}
        </div>
      );
    }

    if (unit === 'detailed') {
      const { years, months, weeks, days, hours, minutes, seconds } = getDetailedDuration(activeMs);
      return (
        <div className={`flex flex-wrap items-center ${flexClass}`}>
          <div className="flex flex-col items-center gap-2">
            <TickerNumber value={years.toString().padStart(2, '0')} height={tickerHeight} /> 
            <span className={labelClass}>Years</span>
          </div>
          <span className={colonClass}>:</span>
          <div className="flex flex-col items-center gap-2">
            <TickerNumber value={months.toString().padStart(2, '0')} height={tickerHeight} /> 
            <span className={labelClass}>Months</span>
          </div>
          <span className={colonClass}>:</span>
          <div className="flex flex-col items-center gap-2">
            <TickerNumber value={weeks.toString().padStart(2, '0')} height={tickerHeight} /> 
            <span className={labelClass}>Weeks</span>
          </div>
          <span className={colonClass}>:</span>
          <div className="flex flex-col items-center gap-2">
            <TickerNumber value={days.toString().padStart(2, '0')} height={tickerHeight} /> 
            <span className={labelClass}>Days</span>
          </div>
          <span className={colonClass}>:</span>
          <div className="flex flex-col items-center gap-2">
            <TickerNumber value={hours.toString().padStart(2, '0')} height={tickerHeight} /> 
            <span className={labelClass}>Hours</span>
          </div>
          <span className={colonClass}>:</span>
          <div className="flex flex-col items-center gap-2">
            <TickerNumber value={minutes.toString().padStart(2, '0')} height={tickerHeight} /> 
            <span className={labelClass}>Minutes</span>
          </div>
          <span className={colonClass}>:</span>
          <div className="flex flex-col items-center gap-2">
            <TickerNumber value={seconds.toString().padStart(2, '0')} height={tickerHeight} /> 
            <span className={labelClass}>Seconds</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        <TickerNumber value={formatDuration(activeMs, unit)} height={tickerHeight} />
      </div>
    );
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl flex flex-col h-full transition-all duration-700 ease-in-out ${layoutClass || 'w-full'}`}
    >
      {/* Full Background SVG Flag Watermark - Adjusted to object-contain so it doesn't get clipped */}
      <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0 p-10 flex items-center justify-center">
        <img src={`https://flagcdn.com/${flagCode}.svg`} alt={`${country} Background`} className="w-full h-full object-contain blur-[8px]" />
      </div>
      
      <div className="relative z-10 w-full flex flex-col h-full">
        {/* Header: Title & Format Controls */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 ${tickerHeight === 40 ? 'mb-6 pb-4' : 'mb-10 pb-6'}`}>
          <div className="flex items-center gap-4">
            <img src={`https://flagcdn.com/${flagCode}.svg`} alt={`${country} Flag`} className={`${tickerHeight === 40 ? 'w-8 h-5' : 'w-10 h-7'} rounded-sm object-cover`} />
            <h3 className={`font-bold ${tickerHeight === 40 ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>{country}</h3>
            <span className={`px-4 py-1.5 text-[10px] md:text-xs font-bold rounded-full border ml-2 whitespace-nowrap ${badgeColor} ${tickerHeight === 40 ? 'hidden lg:block' : ''}`}>
              {badge}
            </span>
          </div>
          
          {/* Local Format Changer */}
          {isDesktop && !isRowLayout ? (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-widest hover:bg-white/20 transition-colors border border-white/5"
              >
                {TIME_UNITS.find(t => t.id === unit)?.label} <ChevronDown className="w-3 h-3" />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    key="format-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 right-0 bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 flex flex-col opacity-100 z-50 min-w-[120px] shadow-2xl"
                  >
                    {TIME_UNITS.map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setUnit(t.id); setIsDropdownOpen(false); }}
                        className={`text-left px-3 py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-colors ${
                          unit === t.id ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/5">
              {TIME_UNITS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setUnit(t.id)}
                  className={`rounded-lg font-semibold transition-all px-4 py-2 text-sm ${
                    unit === t.id ? 'bg-white text-black' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Active Counter Area */}
        <div className="mb-6">
          <div className="text-sm text-neutral-400 uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
            <ActiveIcon className="w-5 h-5 text-white/70" /> {activeTitle}
          </div>
          <ActiveTimeDisplay />
        </div>

        {/* Static Details / Dropdown */}
        {staticDetails && staticDetails.length > 0 && (
          <div className="mt-auto pt-6">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5"
            >
              Other Details
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  key="static-details-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {staticDetails.map((detail, idx) => (
                      <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-full w-fit">
                          <detail.icon className="w-5 h-5 text-neutral-400" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">
                            {detail.title}
                          </div>
                          
                          {/* Display Date vs Duration based on format */}
                          {unit === 'date' ? (
                            <div className="text-sm font-medium text-neutral-300 space-y-3">
                              {detail.dateRanges ? (
                                detail.dateRanges.map((range, i) => (
                                  <div key={i} className="space-y-1">
                                    <div>From: {formatDateObj(range.from)}</div>
                                    <div>To: {range.to ? formatDateObj(range.to) : 'Present'}</div>
                                  </div>
                                ))
                              ) : (
                                <div className="space-y-1">
                                  {detail.fromDate && <div>From: {formatDateObj(detail.fromDate)}</div>}
                                  {detail.toDate && <div>To: {formatDateObj(detail.toDate)}</div>}
                                  {!detail.fromDate && !detail.toDate && <div>-</div>}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-xl font-medium text-neutral-200">
                              {detail.ms !== null ? (
                                unit === 'detailed' ? (
                                  (() => {
                                    const { years, months, weeks, days, hours } = getDetailedDuration(detail.ms);
                                    const parts = [];
                                    if (years) parts.push(`${years} Yr`);
                                    if (months) parts.push(`${months} Mo`);
                                    if (weeks) parts.push(`${weeks} Wk`);
                                    if (days) parts.push(`${days} D`);
                                    if (hours) parts.push(`${hours} Hr`);
                                    return parts.join(' : ') || '0 Hr';
                                  })()
                                ) : (
                                  `${formatDuration(detail.ms, unit)} ${TIME_UNITS.find(t=>t.id===unit)?.label.toUpperCase()}`
                                )
                              ) : (
                                '-'
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default function GeographicTimeline() {
  const [now, setNow] = useState(new Date());
  const [layoutStage, setLayoutStage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isDesktop) return;
    if (latest < 50) setLayoutStage(0);
    else if (latest < 150) setLayoutStage(1);
    else if (latest < 250) setLayoutStage(2);
    else if (latest < 350) setLayoutStage(3);
    else if (latest < 450) setLayoutStage(4);
    else if (latest < 550) setLayoutStage(5);
    else setLayoutStage(6);
  });

  const getCanadaClass = () => {
    if (!isDesktop) return "w-full";
    if (layoutStage === 0) return "col-span-1 col-start-1 row-start-1";
    if (layoutStage === 1) return "col-span-2 col-start-1 row-start-1";
    return "col-span-3 col-start-1 row-start-1";
  };

  const getIndiaClass = () => {
    if (!isDesktop) return "w-full";
    if (layoutStage === 0) return "col-span-1 col-start-2 row-start-1";
    if (layoutStage === 1) return "col-span-1 col-start-3 row-start-1";
    if (layoutStage === 2) return "col-span-1 col-start-3 row-start-2";
    if (layoutStage === 3) return "col-span-2 col-start-2 row-start-2";
    return "col-span-3 col-start-1 row-start-2";
  };

  const getUAEClass = () => {
    if (!isDesktop) return "w-full";
    if (layoutStage === 0) return "col-span-1 col-start-3 row-start-1";
    if (layoutStage === 1) return "col-span-1 col-start-3 row-start-2";
    if (layoutStage === 2) return "col-span-1 col-start-2 row-start-2";
    if (layoutStage === 3) return "col-span-1 col-start-1 row-start-2";
    if (layoutStage === 4) return "col-span-1 col-start-1 row-start-3";
    if (layoutStage === 5) return "col-span-2 col-start-1 row-start-3";
    return "col-span-3 col-start-1 row-start-3";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalLifeMs = now.getTime() - BIRTH_DATE.getTime();
  const indiaMs = totalLifeMs - DUBAI_DURATION_MS; 
  const timeSinceDubaiLeft = now.getTime() - DUBAI_DEPARTURE.getTime();
  
  const canadaLandingDate = CANADA_LANDING;
  const canadaCountdownMs = canadaLandingDate ? Math.max(0, canadaLandingDate.getTime() - now.getTime()) : 0;
  const hasLandedInCanada = canadaLandingDate && now.getTime() >= canadaLandingDate.getTime();

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-white/20 overflow-x-hidden flex flex-col pb-40">
      <div className="relative w-full">
        
        <div className="flex-1 w-full mx-auto px-6 pt-40 pb-20 z-10 flex flex-col items-center">
          <motion.div 
            className="max-w-[1400px] w-full flex flex-col"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16 w-full flex flex-col items-center flex-shrink-0"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-sm mb-6">
                <RefreshCw className="w-4 h-4 animate-spin-slow" /> Live Tracking
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Geographic Timeline
              </h1>
            </motion.div>

            <motion.div 
              layout
              className={`w-full ${isDesktop ? 'grid grid-cols-3 gap-6' : 'flex flex-col gap-10'} transition-all duration-700 ease-in-out`}
            >
              
              <LocationCard 
            country="Canada"
            flagCode="ca"
            badge={!canadaLandingDate ? 'No Plans' : hasLandedInCanada ? 'Currently Visiting' : 'Visiting In'}
            badgeColor={!canadaLandingDate ? 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20' : hasLandedInCanada ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}
            activeTitle={!canadaLandingDate ? 'Time Until Visit' : hasLandedInCanada ? 'Current Duration' : 'Time Until Visit'}
            activeIcon={Plane}
            activeMs={canadaLandingDate ? (hasLandedInCanada ? (now.getTime() - canadaLandingDate.getTime()) : canadaCountdownMs) : 0}
            activeDate={canadaLandingDate}
            isPlaceholder={!canadaLandingDate}
            staticDetails={[
              {
                title: "Total Time Spent",
                icon: Clock,
                ms: hasLandedInCanada ? (now.getTime() - canadaLandingDate.getTime()) : null,
                fromDate: hasLandedInCanada ? canadaLandingDate : null,
                toDate: hasLandedInCanada ? now : null
              },
              {
                title: "Time Since Left",
                icon: History,
                ms: null,
                fromDate: null,
                toDate: null
              },
              {
                title: "Time Until Visit",
                icon: Plane,
                ms: canadaLandingDate ? (hasLandedInCanada ? null : canadaCountdownMs) : null,
                fromDate: canadaLandingDate && !hasLandedInCanada ? now : null,
                toDate: canadaLandingDate && !hasLandedInCanada ? canadaLandingDate : null
              }
            ]}
            isRowLayout={!isDesktop || layoutStage >= 2}
            isDesktop={isDesktop}
            layoutClass={getCanadaClass()}
          />

          <LocationCard 
            country="India"
            flagCode="in"
            badge="Currently Visiting"
            badgeColor="bg-green-500/10 text-green-400 border-green-500/20"
            activeTitle="Current Duration"
            activeIcon={RefreshCw}
            activeMs={indiaMs}
            activeDate={BIRTH_DATE}
            staticDetails={[
              {
                title: "Total Time Spent",
                icon: Clock,
                ms: indiaMs,
                dateRanges: [
                  { from: BIRTH_DATE, to: DUBAI_ARRIVAL },
                  { from: DUBAI_DEPARTURE, to: null }
                ]
              },
              {
                title: "Time Since Left",
                icon: History,
                ms: null,
                fromDate: null,
                toDate: null
              },
              {
                title: "Time Until Visit",
                icon: Plane,
                ms: null,
                fromDate: null,
                toDate: null
              }
            ]}
            isRowLayout={!isDesktop || layoutStage >= 4}
            isDesktop={isDesktop}
            layoutClass={getIndiaClass()}
          />

          <LocationCard 
            country="Dubai"
            flagCode="ae"
            badge="Past Visit"
            badgeColor="bg-white/5 text-neutral-400 border-white/10"
            activeTitle="Time Since Left"
            activeIcon={History}
            activeMs={timeSinceDubaiLeft}
            activeDate={DUBAI_DEPARTURE}
            staticDetails={[
              {
                title: "Total Time Spent",
                icon: Clock,
                ms: DUBAI_DURATION_MS,
                fromDate: DUBAI_ARRIVAL,
                toDate: DUBAI_DEPARTURE
              },
              {
                title: "Time Since Left",
                icon: History,
                ms: timeSinceDubaiLeft,
                fromDate: DUBAI_DEPARTURE,
                toDate: now
              },
              {
                title: "Time Until Visit",
                icon: Plane,
                ms: null,
                fromDate: null,
                toDate: null
              }
            ]}
            isRowLayout={!isDesktop || layoutStage >= 6}
            isDesktop={isDesktop}
            layoutClass={getUAEClass()}
          />

        </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
