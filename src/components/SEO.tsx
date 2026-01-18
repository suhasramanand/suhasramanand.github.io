import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  schema?: object;
}

const baseUrl = "https://suhasramanand.github.io";
const defaultTitle = "Suhas Reddy - Software Engineer & Cloud Specialist | Portfolio";
const defaultDescription = "Software Engineer and Cloud Specialist pursuing Master's at Northeastern University. Specialized in SRE, cloud infrastructure automation, and DevOps. Expertise in AWS, GCP, Kubernetes, Terraform, and CI/CD pipelines.";
const defaultImage = `${baseUrl}/images/profile/profile-pic.jpg`;
const defaultKeywords = "Software Engineer, Cloud Specialist, SRE, DevOps, AWS, GCP, Kubernetes, Terraform, Site Reliability Engineering, Full Stack Developer";

const SEO: React.FC<SEOProps> = ({
  title = defaultTitle,
  description = defaultDescription,
  keywords = defaultKeywords,
  image = defaultImage,
  url,
  type = "website",
  article,
  schema,
}) => {
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullTitle = title === defaultTitle ? title : `${title} | Suhas Reddy`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Suhas Reddy Portfolio" />
      
      {/* Article-specific Open Graph tags */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
