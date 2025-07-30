import { useState } from 'react';
import { useWalletClient, useAccount } from "wagmi"
import { bscTestnet } from "viem/chains"
import { ethers } from "ethers"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
    Upload,
    Calendar,
    Users,
    Coins,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Zap,
    Shield,
    TrendingUp,
    Clock
} from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import { VestingManager, type IVestingForm } from "@thesnakewitcher/vesting-manager";

import LandingBackground from "./LandingBackground"
import MadeWithLove from './MadeWithLove';
import TestnetWarning from "./TestnetWarning"
import FAQs from "./FAQs"

const features = [
    { icon: Shield, title: "Secure & Trustless", desc: "Smart contract based vesting with no intermediaries" },
    { icon: Zap, title: "Instant Setup", desc: "Deploy your vesting schedule in under 2 minutes" },
    { icon: TrendingUp, title: "Flexible Terms", desc: "Custom release schedules for any use case" },
    { icon: Clock, title: "Automatic Distribution", desc: "Your beneficiaries will receive tokens on schedule without you have to worry about it" }
];

export default function () {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const [formData, setFormData] = useState({
    token: '',
    amount: 0,
    startTime: '',
    endTime: '',
    beneficiaries: '',
    cycleDuration: 0
  });
  const submitData = {
    ...formData,
    amount: Number(formData.amount),
    cycleDuration: formData.cycleDuration * 60,
    startTime: new Date(formData.startTime).getTime() / 1000,
    endTime: new Date(formData.endTime).getTime() /1000,
    beneficiaries: formData.beneficiaries.trim().split('\n'),
  } as IVestingForm

  // @ts-ignore
  const [beneficiaries, setBeneficiaries] = useState([
    { name: '', address: '', percentage: '' }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const totalPercentage = beneficiaries.reduce((sum, b) => sum + (parseFloat(b.percentage) || 0), 0);
  const isFormValid = formData.token && formData.amount > 0 && formData.startTime && formData.endTime && formData.cycleDuration && formData.beneficiaries
  const beneficiaryCount = submitData.beneficiaries.length
  
  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTxtUpload = (e: any) => {
    console.log("file uploaded")
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      // WARNING: if not trim() when uploading file create an additional beneficiary
      setFormData({ ...formData, beneficiaries: String(content).trim() }); 
    };
    reader.onerror = () => {
        alert('failed to read file')
    }
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    if (!walletClient) {
        toast.error("error with wallet connection")
        return
    } ;
    setIsSubmitting(true);

    console.log("form data:\n ", formData)
    console.log("submit data:\n ", submitData)

    const runner = await new ethers.BrowserProvider(walletClient.transport).getSigner();
    const chainId = walletClient.chain.id

    const vm = new VestingManager(chainId, runner)
    const tx = await vm.create(submitData)

    console.log(tx)
    toast.success("vesting created successfully")
    setIsSubmitting(false);
  };

  const handleFaucetRequest = () =>  {toast.success("Your test tokens are on its way")}

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
       <LandingBackground/>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-gray-900/90" 
         style={{
           backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
           backgroundSize: '20px 20px'
         }}>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-16 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <ToastContainer position="top-right" autoClose={5000} closeOnClick={true} theme="dark"/>
            <MadeWithLove/>
            <div className="text-center pb-16">
              <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
                Token Vesting
                <br />
                <span className="text-white">Made Simple</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Create secure, automated token vesting schedules with our intuitive interface. 
                Perfect for team allocations, investor relations, and community rewards.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-full px-4 py-2">
                    <feature.icon className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-300">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Form Card */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
              
              <div className="relative bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-12">
                {/* Progress Indicator */}
                <div className="hidden sm:flex justify-between items-center mb-12">
                  <div className="flex items-center gap-4">
                    {[
                      { icon: Coins, label: 'Token Details' },
                      { icon: Calendar, label: 'Schedule' },
                      { icon: Users, label: 'Beneficiaries' }
                    ].map((step, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          currentStep >= index 
                            ? 'bg-blue-500 border-blue-500 text-white' 
                            : 'border-gray-600 text-gray-400'
                        }`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-sm font-medium ${
                          currentStep >= index ? 'text-white' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </span>
                        {index < 2 && (
                          <div className={`w-8 h-px mx-2 transition-colors duration-300 ${
                            currentStep > index ? 'bg-blue-500' : 'bg-gray-600'
                          }`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                <ConnectButton accountStatus="avatar" chainStatus="icon"/>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Token Details Section */}
                    <div className="group">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                          <Coins className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">Token Configuration</h2>
                          <p className="text-gray-400 text-sm">Define your token contract and amount</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-200">
                            Token Contract Address
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="token"
                              value={formData.token}
                              onChange={handleChange}
                              onFocus={() => setCurrentStep(0)}
                              className="w-full h-14 px-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                              placeholder="0x..."
                            />
                            {formData.token && (
                              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-200">
                            Total Vesting Amount
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              name="amount"
                              value={formData.amount}
                              onChange={handleChange}
                              onFocus={() => setCurrentStep(0)}
                              className="w-full h-14 px-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                              placeholder="1000000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>

                  {/* Right Column - Beneficiaries */}
                    {/* Schedule Section */}
                    <div className="group">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">Vesting Schedule</h2>
                          <p className="text-gray-400 text-sm">Set your timeline and release frequency</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-200">
                              Start Date
                            </label>
                            <input
                              type="datetime-local"
                              name="startTime"
                              value={formData.startTime}
                              onChange={handleChange}
                              onFocus={() => setCurrentStep(1)}
                              className="w-full h-14 px-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-200">
                              End Date
                            </label>
                            <input
                              type="datetime-local"
                              min={Date.now()}
                              name="endTime"
                              value={formData.endTime}
                              onChange={handleChange}
                              onFocus={() => setCurrentStep(1)}
                              className="w-full h-14 px-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-200">
                            Release Frequency (minutes)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              name="cycleDuration"
                              value={formData.cycleDuration}
                              onChange={handleChange}
                              onFocus={() => setCurrentStep(1)}
                              className="w-full h-14 px-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                              placeholder="1440"
                            />
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setFormData({ ...formData, cycleDuration: 1440 })}
                              className="px-3 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors"
                            >
                              Daily
                            </button>
                            <button
                              onClick={() => setFormData({ ...formData, cycleDuration: 10080 })}
                              className="px-3 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors"
                            >
                              Weekly
                            </button>
                            <button
                              onClick={() => setFormData({ ...formData, cycleDuration: 43200 })}
                              className="px-3 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors"
                            >
                              Monthly
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

                <div className="space-y-8 mt-6">
                  <div className="group">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">
                            Beneficiaries
                          </h2>
                          <p className="text-gray-400 text-sm">Add wallet addresses</p>
                        </div>
                      </div>

                      {/* IMPORT CSV BUTTON */}
                    </div>

                    {/* Beneficiaries List */}
                    {/* <LandingBeneficiaries/> */}
                    <textarea
                      onFocus={() => setCurrentStep(2)}
                      name="beneficiaries"
                      rows={4}
                      value={formData.beneficiaries}
                      onChange={handleChange}
                      placeholder={"Insert an address per line: \n0xabc...\n0xdef..."}
                      className="w-full p-3 rounded-md bg-[#2b2b4f] border border-gray-600 text-white"
                    />
                    <div className="flex gap-2 mt-2">
                      <input
                        type="file"
                        accept=".txt"
                        onChange={handleTxtUpload}
                        className="hidden"
                        id="csv-upload"
                      />
                      <label
                        htmlFor="csv-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-xl text-sm text-gray-300 cursor-pointer transition-all duration-200 hover:scale-105"
                      >
                        <Upload className="w-4 h-4" />
                        Import from .txt
                      </label>
                    </div>

                    {/* Allocation Summary */}
                    {walletClient?.chain.id == bscTestnet.id && <TestnetWarning chainId={bscTestnet.id} address={address!} notifiationFn={handleFaucetRequest}/>}
                    {isFormValid && (
                      <div className="mt-6 mb-6">
                        <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                          totalPercentage === 100 
                            ? 'bg-green-500/10 border-green-500/30 shadow-lg shadow-green-500/10' 
                            : totalPercentage > 100 
                            ? 'bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/10' 
                            : 'bg-yellow-500/10 border-yellow-500/30 shadow-lg shadow-yellow-500/10'
                        }`}>
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                              {totalPercentage === 100 ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-yellow-400" />
                              )}
                              <span className="font-semibold text-white">Total Allocation</span>
                            </div>
                          </div>
                          
                          {totalPercentage !== 100 && (
                            <p className="text-sm text-gray-300">
                                Starting at  <strong> { `${new Date(formData.startTime)}` } </strong> during 
                                <strong> { Math.round( (submitData.endTime - submitData.startTime) / submitData.cycleDuration) } </strong> cycles of 
                                <strong> { formData.cycleDuration } </strong> minutes duration each release
                                <strong> { `${ (formData.amount / Math.round( (submitData.endTime - submitData.startTime) / submitData.cycleDuration)) / beneficiaryCount}` } </strong>
                                tokens to { `${beneficiaryCount == 1 ? "the" : "each" }` } beneficiary
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Section */}
                <div className="mt-12 pt-8 border-t border-gray-700/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-white mb-1">Ready to Deploy?</h3>
                      <p className="text-sm text-gray-400">
                        {isFormValid 
                          ? "All fields are completed. Deploy your vesting schedule now."
                          : "Please complete all required fields"
                        }
                      </p>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid || isSubmitting}
                      className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                        isFormValid && !isSubmitting
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105'
                          : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Creating Schedule...
                          </>
                        ) : (
                          <>
                            <span>Create Vesting Schedule</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Features */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              {features.map((feature, index) => (
                <div key={index} className="group p-6 bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:bg-gray-800/30 hover:border-gray-600/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>

            <FAQs/>

          </div>
        </section>
      </div>
    </div>
  );
};
