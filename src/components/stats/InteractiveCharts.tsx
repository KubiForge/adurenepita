import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import {
  SUBSTANCE_TREND_CHART_DATA,
  AGE_DISTRIBUTION_DATA,
  HELP_SEEKING_REASONS_DATA,
  KEY_STATISTICS,
  METHODOLOGY_NOTE,
} from '../../data/statisticsData';
import { ShieldCheck, Info, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const COLORS = ['#8B1E2D', '#D35D6E', '#55743D', '#A3C585', '#E7D7CE'];

export const InteractiveCharts: React.FC = () => {
  const { language, t } = useLanguage();
  const ageDistributionData = AGE_DISTRIBUTION_DATA.map((entry) => ({
    ...entry,
    ageGroup: language === 'si' ? entry.ageGroupSi : language === 'ta' ? entry.ageGroupTa : entry.ageGroup,
  }));
  const helpSeekingReasonsData = HELP_SEEKING_REASONS_DATA.map((entry) => ({
    ...entry,
    reason: language === 'si' ? entry.reasonSi : language === 'ta' ? entry.reasonTa : entry.reason,
  }));

  return (
    <div className="space-y-12">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KEY_STATISTICS.map((stat) => (
          <div key={stat.id} className="charcoal-card p-6 border-gold/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-gold/80 mb-2">
                <span className="font-semibold">{language === 'si' ? stat.trendValueSi : language === 'ta' ? stat.trendValueTa : stat.trendValue}</span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-ivory/50">
                  <Calendar className="w-3 h-3" />
                  <span>{language === 'si' ? stat.dateRangeSi : language === 'ta' ? stat.dateRangeTa : stat.dateRange}</span>
                </span>
              </div>
              <div className="text-3xl font-bold font-heading text-champagne mb-1">
                {stat.metric}
              </div>
              <h4 className="text-sm font-bold text-ivory leading-snug">
                {language === 'si' ? stat.labelSi : language === 'ta' ? stat.labelTa : stat.label}
              </h4>
              <p className="text-xs text-ivory/60 mt-2 leading-relaxed">
                {language === 'si' ? stat.subtextSi : language === 'ta' ? stat.subtextTa : stat.subtext}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-charcoal-light text-[10px] text-ivory/40 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-gold/60 flex-shrink-0" />
              <span className="truncate">{t('statistics.source')}: {language === 'si' ? stat.sourceSi : language === 'ta' ? stat.sourceTa : stat.source}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart 1: Substance Trends in Sri Lanka (2020-2025) */}
      <div className="charcoal-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-charcoal-light">
          <div>
            <span className="text-xs uppercase tracking-wider text-gold font-bold">
              {t('statistics.surveillance')}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-ivory mt-0.5">
              {t('statistics.trendTitle')}
            </h3>
          </div>
          <div className="text-xs text-ivory/50 font-mono">
            {t('statistics.source')}: {t('statistics.nddcbReports')}
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SUBSTANCE_TREND_CHART_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7D7CE" />
              <XAxis dataKey="year" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E7D7CE',
                  borderRadius: '0.75rem',
                  color: '#1F2937',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="Heroin" name={t('statistics.heroin')} fill="#8B1E2D" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Cannabis" name={t('statistics.cannabis')} fill="#D35D6E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ICE" name={t('statistics.ice')} fill="#A3C585" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-ivory/50 mt-4 italic text-center">
          {t('statistics.trendNote')}
        </p>
      </div>

      {/* Main Chart 2: Age Demographics & Help-Seeking Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sub-Chart A: Age Distribution */}
        <div className="charcoal-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-heading text-ivory mb-1">
              {t('statistics.ageTitle')}
            </h3>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageDistributionData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7D7CE" />
                  <XAxis type="number" stroke="#6B7280" fontSize={11} unit="%" />
                  <YAxis type="category" dataKey="ageGroup" stroke="#6B7280" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E7D7CE',
                      borderRadius: '0.5rem',
                      color: '#1F2937',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="percentage" fill="#8B1E2D" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-[11px] text-ivory/50 mt-3 pt-3 border-t border-charcoal-light">
            {t('statistics.ageNote')}
          </p>
        </div>

        {/* Sub-Chart B: Primary Help-Seeking Reasons */}
        <div className="charcoal-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-heading text-ivory mb-1">
              {t('statistics.helpReasonsTitle')}
            </h3>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={helpSeekingReasonsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {helpSeekingReasonsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E7D7CE',
                      borderRadius: '0.5rem',
                      color: '#1F2937',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-[11px] text-ivory/50 mt-3 pt-3 border-t border-charcoal-light">
            {t('statistics.helpReasonsNote')}
          </p>
        </div>
      </div>

      {/* Methodology Notes Card */}
      <div className="p-6 rounded-2xl bg-midnight border border-gold/30 text-xs text-ivory/70 space-y-3">
        <h4 className="font-heading font-bold text-base text-gold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-gold" />
          <span>{language === 'si' ? METHODOLOGY_NOTE.titleSi : language === 'ta' ? METHODOLOGY_NOTE.titleTa : METHODOLOGY_NOTE.title}</span>
        </h4>
        <ul className="list-disc pl-5 space-y-1.5 text-ivory/60 leading-relaxed">
          {(language === 'si' ? METHODOLOGY_NOTE.notesSi : language === 'ta' ? METHODOLOGY_NOTE.notesTa : METHODOLOGY_NOTE.notes).map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
