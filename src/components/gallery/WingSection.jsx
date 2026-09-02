import galleryData from '../../data/gallery.json';
import SectionHeader from '../ui/SectionHeader.jsx';
import SeriesBlock from './SeriesBlock.jsx';
import GradeLab from './GradeLab.jsx';

export default function WingSection({ wing }) {
  const series = galleryData.series.filter((s) => s.wing === wing.id);

  return (
    <section
      id={wing.id}
      className={`py-24 md:py-40 px-6 md:px-12 lg:px-20 border-t border-white/5 ${wing.bg || ''}`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 4000px' }}
    >
      <SectionHeader
        number={wing.num}
        name={wing.name}
        heading={wing.heading}
        headingAccent={wing.headingAccent}
        numberColor={wing.numberColor}
        intro={wing.intro}
      />

      {wing.showGradeLab && <GradeLab />}

      {series.map((s, i) => (
        <SeriesBlock key={s.id} series={s} isLast={i === series.length - 1} />
      ))}
    </section>
  );
}
