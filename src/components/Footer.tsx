import { ExternalLink, UserCircleIcon } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1a1a2e] border-t border-purple-400/20 pt-12 pb-6 px-4 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center gap-8 mb-12">
          <div className='flex items-center justify-center gap-4'>
            <h3 className="text-purple-400 font-bold text-lg">Powered By</h3>
            <ul className="flex items-center gap-6">
              <li>
                <a
                  href="https://base.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1"
                >
                  Base <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://developers.moralis.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1"
                >
                  Moralis <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://zerion.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1"
                >
                  Zerion <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div >

        {/* Bottom Section */}
        < div className="border-t border-purple-400/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" >
          <div className="text-gray-400 text-sm">
            <span className="font-bold text-purple-400">Aura Analyzer</span> © 2024 | Built with 💜 by BlockchainWorldco
          </div>
          <div className="flex items-center gap-4">
            <div className='flex flex-col justify-center items-center'>
              <a
                href="https://twitter.com/kunalg_twt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <UserCircleIcon size={20} />
              </a>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <a
                href="https://instagram.com/blockchainworldco"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition-colors"
              >
                <UserCircleIcon size={20} />
              </a>
            </div>
          </div>
        </div >
      </div >
    </footer >
  )
}

