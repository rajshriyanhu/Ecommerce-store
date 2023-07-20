import Link from "next/link";
import { useRouter } from "next/router";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  src: string;
  slug: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, subtitle, src, slug }) => {
  return (
    <Link href={`/category/${encodeURIComponent(slug)}`}>
      <div className="h-[60px] w-[90%] shadow-md cursor-pointer mx-4 my-4 rounded-xl overflow-hidden flex items-center border hover:shadow-xl bg-lime-100">
        <div className="h-[55px] w-[55px] rounded-full overflow-hidden ml-2">
          <img src={src} alt={title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
        </div>
        <div className="mx-2">{title}</div>
      </div>
    </Link>
  );
};

export default CategoryCard;
