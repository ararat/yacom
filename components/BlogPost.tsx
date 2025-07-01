import Link from "next/link";
import Image from "../components/image";

const BlogPost = (props: {
  key: string;
  path: string;
  title: string;
  slug: string;
  description: string;
  imageSrc: string;
  className: string;
}): JSX.Element => {
  const imgSrc =
    props.imageSrc === "" ? "/img/blog/blog-thumbnail.jpeg" : props.imageSrc;
  return (
    <Link href={props.path} passHref>
      <article
        key={props.slug}
        className={`group relative rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden hover-lift h-full flex flex-col ${props.className}`}
      >
        <div className="w-full h-32 sm:h-48 md:h-52 lg:h-56 xl:h-60 overflow-hidden relative">
          <Image
            src={imgSrc}
            alt={props.title}
            width={300}
            height={180}
            layout="responsive"
            className="w-full h-full object-center object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-2 sm:p-4 lg:p-5 xl:p-6 flex flex-col flex-grow">
          <h3 className="font-bold text-xs sm:text-lg lg:text-xl xl:text-2xl text-gray-900 mb-2 sm:mb-3 line-clamp-3 sm:line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
            {props.title}
          </h3>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3 flex-grow">
            {props.description}
          </p>
          <div className="mt-2 sm:mt-4 flex items-center text-blue-600 text-xs sm:text-sm lg:text-base font-medium group-hover:text-blue-700 transition-colors duration-200">
            <span>Read more</span>
            <svg className="ml-1 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};
export default BlogPost;
