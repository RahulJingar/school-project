// components/Courses.jsx - Courses Listing Page
import React from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const courses = [
    { id: 1, title: 'Class 10 Maths Complete Course', teacher: 'Rohit Sir', price: '₹999', students: 247, image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg' },
    { id: 2, title: 'Class 12 Physics PYQs + Notes', teacher: 'Priya Maam', price: '₹799', students: 183, image: 'https://images.pexels.com/photos/267889/pexels-photo-267889.jpeg' },
    { id: 3, title: 'English Grammar & Essay Writing', teacher: 'Ankit Sir', price: '₹499', students: 156, image: 'https://images.pexels.com/photos/5120051/pexels-photo-5120051.jpeg' },
    { id: 4, title: 'Chemistry Organic Full Syllabus', teacher: 'Neha Maam', price: '₹1299', students: 89, image: 'https://images.pexels.com/photos/4148378/pexels-photo-4148378.jpeg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Explore School Courses
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Apne school teachers ke trusted courses. Notes, videos, tests - sab ek jagah.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-2">
              <div className="h-48 rounded-t-2xl overflow-hidden relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  New
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-sm text-indigo-600 font-semibold">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                  {course.teacher}
                </div>
                
                <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="text-2xl font-bold text-indigo-600">
                    {course.price}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {course.students}+ students
                  </div>
                </div>
                
                <Link
                  to={`/course/${course.id}`}
                  className="w-full block text-center py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  View Course Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 p-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white">
          <h2 className="text-3xl font-bold mb-4">Course pasand aaya?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Abhi browse karo aur apne school teachers ke courses buy karo. Limited time discount available!
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-2xl hover:bg-indigo-50 transition-all duration-200 shadow-2xl hover:shadow-3xl hover:-translate-y-1"
          >
            Explore All Courses
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Courses;
