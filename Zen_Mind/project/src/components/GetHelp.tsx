import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const professionals = [
  {
    name: "Dr. Sarah Johnson",
    type: "Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    location: "Downtown Medical Center",
    phone: "+1 (555) 123-4567",
    email: "dr.johnson@example.com",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    name: "Dr. Michael Chen",
    type: "Psychiatrist",
    specialties: ["Mood Disorders", "ADHD", "Anxiety"],
    location: "Wellness Center East",
    phone: "+1 (555) 234-5678",
    email: "dr.chen@example.com",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    name: "Dr. Emily Rodriguez",
    type: "Clinical Psychologist",
    specialties: ["Relationship Issues", "Stress Management", "Depression"],
    location: "Mental Health Associates",
    phone: "+1 (555) 345-6789",
    email: "dr.rodriguez@example.com",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=300&h=300"
  }
];

const emergencyResources = [
  {
    name: "Mental Health Helpline",
    phone: "14416",
    available: "24/7"
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 14416",
    available: "24/7"
  }
];

const GetHelp: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredProfessionals = selectedType === 'all'
    ? professionals
    : professionals.filter(p => p.type.toLowerCase() === selectedType.toLowerCase());

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Get Help</h2>
        <p className="mt-2 text-gray-600">Connect with mental health professionals</p>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-red-700">Emergency Resources</h3>
        <div className="mt-2 space-y-2">
          {emergencyResources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-red-600">{resource.name}</span>
              <span className="font-medium text-red-700">{resource.phone}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-4 py-2 rounded-lg ${
            selectedType === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedType('psychologist')}
          className={`px-4 py-2 rounded-lg ${
            selectedType === 'psychologist'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Psychologists
        </button>
        <button
          onClick={() => setSelectedType('psychiatrist')}
          className={`px-4 py-2 rounded-lg ${
            selectedType === 'psychiatrist'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Psychiatrists
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProfessionals.map((professional, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex">
              <img
                src={professional.image}
                alt={professional.name}
                className="w-32 h-32 object-cover"
              />
              <div className="p-4 flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{professional.name}</h3>
                <p className="text-purple-600">{professional.type}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {professional.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-purple-50 text-purple-700 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 px-4 py-3 space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2" />
                {professional.location}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                {professional.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                {professional.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetHelp;