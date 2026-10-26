import React from 'react';
import { EmptyState } from '../components/common/EmptyState';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <EmptyState
        title="الصفحة المطلوبة غير موجودة (404)"
        description="الصفحة التي تبحث عنها قد تم نقلها أو أنها غير متوفرة حالياً."
        actionText="العودة للصفحة الرئيسية"
        onAction={() => navigate('/')}
      />
    </div>
  );
};
