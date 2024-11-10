import React from 'react';

const supportCategories = [
  {
    title: 'Anxiety Support',
    description: 'Connect with others managing anxiety and share coping strategies.',
    spaces: 5,
  },
  {
    title: 'Depression Support',
    description: 'A safe space to discuss experiences and find understanding.',
    spaces: 5,
  },
  {
    title: 'Stress Management',
    description: 'Learn and share techniques for managing daily stress.',
    spaces: 5,
  },
  {
    title: 'Mindfulness Practice',
    description: 'Group sessions focusing on mindfulness and meditation.',
    spaces: 5,
  },
  {
    title: 'Work-Life Balance',
    description: 'Discuss challenges and strategies for maintaining balance.',
    spaces: 5,
  },
];

const SupportGroups: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Support Groups</h2>
        <p className="mt-2 text-gray-600">Find your community and share your journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
            <p className="text-gray-600">{category.description}</p>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Available Sessions:</p>
              {Array.from({ length: category.spaces }).map((_, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">Session {i + 1}</span>
                  <button className="px-4 py-1 text-sm text-purple-600 border border-purple-600 rounded-full hover:bg-purple-50">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportGroups;