import { AlertTriangle, Droplets, ExternalLink } from 'lucide-react';

export default function (
    {address, chainId}: {chainId: number ,address: string}
) {

  const handleFaucet = () => {
    const body = JSON.stringify({ chainId, user: address })
    console.log(body)
    fetch("https://opsljrtyq0.execute-api.us-east-2.amazonaws.com/faucet", { body, method: "POST" })
  }

  return (
    <div className="mt-4 bg-gradient-to-br from-yellow-600/10 to-orange-600/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-yellow-400 mb-2">
            Testnet Environment Notice. Need test tokens to try the protocol ?
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            This is a testing environment using testnet tokens with no real value. 
            All transactions and vesting schedules created here are for demonstration purposes only.
            To interact with our token vesting protocol, you'll need testnet tokens. Get them instantly from our faucet service
          </p>
          <div className="mt-1 flex flex-col sm:flex-row gap-3">
            <button onClick={handleFaucet} className="inline-flex items-center px-4 py-2 border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white font-medium rounded-lg transition-colors">
              <Droplets className="w-4 h-4 mr-2" />
              Get testnet tokens
              <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
