import PageContainer from '../components/PageContainer';
import { guides } from '../data/siteData';

export default function GuidesPage() {
  return (
    <PageContainer
      title="Cẩm nang"
      subtitle="Trang này nên là blog: bài viết SEO, kinh nghiệm visa, kinh nghiệm hành hương, mẹo đi tour và tin tức du lịch."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {guides.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-md border border-[#eadfce] bg-white shadow-sm">
            <div className="h-48 bg-[linear-gradient(135deg,#f5e4c3,#d0a164,#815321)]" />
            <div className="p-4">
              <h3 className="text-base font-extrabold leading-6 text-[#6f4817]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#65543e]">{item.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}