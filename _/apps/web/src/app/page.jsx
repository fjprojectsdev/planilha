export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <h1 className="font-space-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] text-black dark:text-white mb-6">
          Bem-vindo ao seu
        </h1>
        <h2 className="font-space-grotesk font-bold text-[clamp(1.5rem,4vw,2.5rem)] text-[#E84A03] dark:text-[#FF6B1A] mb-8">
          Gerenciador de Contatos
        </h2>

        <p className="font-inter text-lg text-[#6B6B6B] dark:text-white/70 mb-12 leading-relaxed">
          — organize sua rede profissional de forma simples e eficiente
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contacts"
            className="group inline-flex items-center justify-center bg-[#E84A03] hover:bg-[#D23E02] active:bg-[#B73502] dark:bg-[#FF6B1A] dark:hover:bg-[#FF5C05] dark:active:bg-[#EA4F00] text-white rounded-full h-14 px-8 font-inter font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Acessar Contatos
          </a>

          <div className="inline-flex items-center justify-center border-2 border-[#E1DFDB] dark:border-[#262626] text-black dark:text-white rounded-full h-14 px-8 font-inter font-medium text-base">
            Organize • Busque • Gerencie
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#E84A03] dark:bg-[#FF6B1A] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <h3 className="font-space-grotesk font-semibold text-lg text-black dark:text-white mb-2">
              Adicione Contatos
            </h3>
            <p className="font-inter text-sm text-[#6B6B6B] dark:text-white/70">
              Cadastre nome, portfólio, contato e serviços
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-[#E84A03] dark:bg-[#FF6B1A] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="font-space-grotesk font-semibold text-lg text-black dark:text-white mb-2">
              Busque Facilmente
            </h3>
            <p className="font-inter text-sm text-[#6B6B6B] dark:text-white/70">
              Encontre rapidamente por nome, serviço ou contato
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-[#E84A03] dark:bg-[#FF6B1A] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="font-space-grotesk font-semibold text-lg text-black dark:text-white mb-2">
              Edite e Organize
            </h3>
            <p className="font-inter text-sm text-[#6B6B6B] dark:text-white/70">
              Mantenha suas informações sempre atualizadas
            </p>
          </div>
        </div>
      </div>

      {/* Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        
        .font-space-grotesk {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}
