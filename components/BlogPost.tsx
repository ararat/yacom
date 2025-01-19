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
      <div
        key={props.slug}
        className={`group relative rounded-md text-center drop-shadow-2xl hover:bg-slate-300 bg-indigo-400 ${props.className}`}
      >
        <div className="w-full min-h-60  aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
          <Image
            src={imgSrc}
            alt={props.title}
            width={60}
            height={60}
            layout="responsive"
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
        <h3 className="font-semibold p-3 truncate">{props.title}</h3>
        <p className="mt-1 text-sm p-3 truncate"> {props.description}</p>
      </div>
    </Link>
  );
};
export default BlogPost;
