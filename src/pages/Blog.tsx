import Navbar from "@/components/Navbar";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 sm:pt-32 container mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Blog</h1>
        <p className="text-muted-foreground">Insights and updates coming soon...</p>
      </main>
    </div>
  );
};

export default Blog;
