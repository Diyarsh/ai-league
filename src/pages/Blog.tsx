import Navbar from "@/components/Navbar";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-muted-foreground">Insights and updates coming soon...</p>
      </main>
    </div>
  );
};

export default Blog;
