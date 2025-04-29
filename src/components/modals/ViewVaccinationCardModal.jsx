import React from 'react'
import VaccinationCard from '../../pages/vaccinationCard/VaccinationCard'

export default function ViewVaccinationCardModal({ isOpen, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      <div
        className="fixed inset-0 bg-gray-500/75"
        onClick={onClose}
      />
  
      <div className="relative bg-white rounded-xl shadow-lg w-full mx-4  overflow-hidden">
        <div className="overflow-y-auto max-h-[80vh] p-6">
          <VaccinationCard />
        </div>
      </div>
    </div>
  );
  
}
