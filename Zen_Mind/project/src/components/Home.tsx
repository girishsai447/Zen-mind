import React, { useState } from 'react';
import { Heart, Users, Brain, LifeBuoy, Smile, Shield, Clock, MessageCircle, Sparkles, Target, Star } from 'lucide-react';
import AITherapist from './AITherapist';

interface HomeProps {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
}

const SignInForm: React.FC<{ onSignIn: (email: string) => void }> = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Heart className="mx-auto text-purple-500 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Zen-Mind</h1>
          <p className="mt-2 text-gray-600">Your safe space for mental wellness</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ name: string }> = ({ name }) => {
  const features = [
    {
      icon: Shield,
      title: "Safe Space",
      description: "A secure environment for sharing your thoughts and feelings"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others who understand your journey"
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Tools and resources for emotional well-being"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Access help whenever you need it"
    }
  ];

  const statistics = [
    {
      number: "1000+",
      label: "Active Members",
      icon: Users
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: Clock
    },
    {
      number: "500+",
      label: "Success Stories",
      icon: Smile
    },
    {
      number: "50+",
      label: "Expert Therapists",
      icon: Sparkles
    }
  ];

  // Get Zen-Stars from localStorage or default to 0
  const zenStars = parseInt(localStorage.getItem('zenStars') || '0');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome back, {name}!</h2>
        <p className="mt-2 text-gray-600">How are you feeling today?</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center space-x-2">
          <Star className="text-yellow-400 fill-yellow-400" size={24} />
          <span className="text-xl font-semibold text-gray-800">
            {zenStars} Zen-Stars Earned
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <Target className="text-purple-500 mb-4" size={24} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Daily Goals</h3>
          <p className="text-gray-600">Set and track your mental wellness goals</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <MessageCircle className="text-purple-500 mb-4" size={24} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Chat Support</h3>
          <p className="text-gray-600">Connect with our AI therapist anytime</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <Brain className="text-purple-500 mb-4" size={24} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Mindfulness</h3>
          <p className="text-gray-600">Practice mindfulness exercises</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
            <feature.icon className="mx-auto text-purple-500 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold">{stat.number}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-purple-800 mb-4">Daily Inspiration</h3>
        <p className="text-purple-700 italic">
          "The greatest happiness of life is the conviction that we are loved." - Victor Hugo
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">7</div>
            <div className="text-sm text-purple-600">Days Active</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-sm text-purple-600">Goals Completed</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-purple-600">Sessions Joined</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-purple-600">Wellness Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ isSignedIn, setIsSignedIn }) => {
  const [name, setName] = useState('');

  const handleSignIn = (email: string) => {
    setIsSignedIn(true);
    setName(email.split('@')[0]);
  };

  if (!isSignedIn) {
    return <SignInForm onSignIn={handleSignIn} />;
  }

  return (
    <>
      <Dashboard name={name} />
      <AITherapist />
    </>
  );
};

export default Home;