import Link from 'next/link';
import Image from 'next/image';
import { Target, Puzzle, Trophy, ArrowUpRight } from 'lucide-react';
import { projectsList } from '@/data/projects';


export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const projectListEntry = projectsList.find(p => p.id === slug) || projectsList.find(p => p.id === 'ecoscan')!;
  const projectInfo = {
    title: projectListEntry.name,
    description: projectListEntry.description,
    liveUrl: projectListEntry.liveUrl || '#',
    client: projectListEntry.client || 'Personal Project',
    service: projectListEntry.service || 'Development',
    info: projectListEntry.info
  };
  const media = projectListEntry.media || [];

  // Filter out the current project and select the next 4 for the "Recent Works" section
  const relatedProjects = projectsList.filter(p => p.id !== slug).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-40 pb-20 flex flex-col items-center">
      
      {/* 1. Hero Section */}
      <section className="max-w-[1200px] w-full px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center mb-32">
        
        {/* Left: Website Info */}
        <div className="flex flex-col">
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-8">
            {projectInfo.title}
          </h1>
          
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10 max-w-md">
            {projectInfo.description}
          </p>
          
          <Link 
            href={projectInfo.liveUrl}
            className="w-fit px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-semibold mb-16"
          >
            Live Site Preview
          </Link>

          {/* Client Info Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-neutral-500 font-medium">Client</span>
              <span className="text-sm text-neutral-300 font-semibold">{projectInfo.client}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-xs text-neutral-500 font-medium">Service Provided</span>
              <span className="text-sm text-neutral-300 font-semibold">{projectInfo.service}</span>
            </div>
          </div>
        </div>

        {/* Right: Main Image */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] bg-[#050505] rounded-[2rem] border border-white/5 p-4 md:p-8 flex items-center justify-center shadow-2xl relative overflow-hidden group">
            
            {/* The actual project image placeholder */}
            <div className="w-full h-full bg-[#111] rounded-xl border border-white/10 flex items-center justify-center relative z-10 overflow-hidden">
               {media.length > 0 ? (
                 <Image src={media[0]} alt={projectInfo.title} fill className="object-cover" />
               ) : (
                 <span className="text-sm font-bold text-neutral-600 tracking-widest uppercase">Project Image</span>
               )}
               {/* Optional gradient/glow for aesthetics */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500/20 blur-[60px] pointer-events-none" />
            </div>

            {/* Background ambient glow behind the inner container */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 z-0" />
          </div>
        </div>

      </section>

      {/* 2. Info Section */}
      <section className="max-w-[1000px] w-full flex flex-col gap-16 mb-32 bg-[#09090a] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* The Goal */}
        <div className="flex flex-col gap-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-neutral-400" />
              <h3 className="text-2xl font-bold">The Goal:</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-neutral-400">
              1
            </div>
          </div>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
            {projectInfo.info?.goal}
          </p>
          <div className="w-full aspect-[2000/1414] bg-[#080808] border border-white/5 rounded-[2rem] mt-4 flex items-center justify-center overflow-hidden relative shadow-inner">
            {media.length > 1 ? (
              <Image src={media[1]} alt="Goal Image" fill className="object-cover" />
            ) : (
              <span className="text-sm font-bold text-neutral-700 tracking-widest uppercase">Goal Image</span>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-white/5" />

        {/* The Challenge */}
        <div className="flex flex-col gap-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Puzzle className="w-6 h-6 text-neutral-400" />
              <h3 className="text-2xl font-bold">The Challenge:</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-neutral-400">
              2
            </div>
          </div>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
            {projectInfo.info?.challenge}
          </p>
          <div className="w-full aspect-[2000/1414] bg-[#080808] border border-white/5 rounded-[2rem] mt-4 flex items-center justify-center overflow-hidden relative shadow-inner">
            {media.length > 2 ? (
              <Image src={media[2]} alt="Challenge Image" fill className="object-cover" />
            ) : (
              <span className="text-sm font-bold text-neutral-700 tracking-widest uppercase">Challenge Image</span>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-white/5" />

        {/* The Result */}
        <div className="flex flex-col gap-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-neutral-400" />
              <h3 className="text-2xl font-bold">The Result</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-neutral-400">
              3
            </div>
          </div>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
            {projectInfo.info?.result}
          </p>
          <div className="w-full aspect-[2000/1414] bg-[#080808] border border-white/5 rounded-[2rem] mt-4 flex items-center justify-center overflow-hidden relative shadow-inner">
            {media.length > 3 ? (
              <Image src={media[3]} alt="Result Image" fill className="object-cover" />
            ) : (
              <span className="text-sm font-bold text-neutral-700 tracking-widest uppercase">Result Collage</span>
            )}
          </div>
        </div>

      </section>

      {/* 3. Recent Projects / More Work */}
      <section className="max-w-[1200px] w-full px-6 flex flex-col mb-32 border-t border-white/5 pt-20">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-medium tracking-tight">Recent Projects</h2>
          <Link 
            href="/projects"
            className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white hover:text-black transition-colors"
          >
            See All Projects
          </Link>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedProjects.map((rp) => (
            <Link 
              key={rp.id} 
              href={`/projects/${rp.id}`}
              className="group block relative"
            >
              <div className="w-full relative flex flex-col bg-[#050505] border border-white/5 rounded-3xl p-4 overflow-hidden transition-colors hover:border-white/10 hover:bg-[#080808]">
                {/* Image Placeholder */}
                <div className={`w-full aspect-[4/3] rounded-2xl flex items-center justify-center border border-white/5 overflow-hidden relative ${rp.imageType === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                  {rp.media && rp.media.length > 0 ? (
                    <Image src={rp.media[0]} alt="Project" fill className="object-cover" />
                  ) : (
                    <span className={`text-xs font-semibold tracking-wider ${rp.imageType === 'dark' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                      Project Image
                    </span>
                  )}
                  
                  {/* Arrow Icon embedded on image */}
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

    </main>
  );
}
