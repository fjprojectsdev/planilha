'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const queryClient = useQueryClient();

  // Fetch contacts
  const { data: contactsData, isLoading, error } = useQuery({
    queryKey: ['contacts', search],
    queryFn: async () => {
      const url = search ? `/api/contacts?search=${encodeURIComponent(search)}` : '/api/contacts';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      return response.json();
    },
  });

  const contacts = contactsData?.contacts || [];

  // Add contact mutation
  const addContactMutation = useMutation({
    mutationFn: async (contactData) => {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add contact');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setShowAddForm(false);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  // Update contact mutation
  const updateContactMutation = useMutation({
    mutationFn: async ({ id, ...contactData }) => {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update contact');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setEditingContact(null);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  // Delete contact mutation
  const deleteContactMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
      deleteContactMutation.mutate(id);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F4F2] dark:bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-space-grotesk font-bold text-2xl text-red-600 mb-4">Erro</h2>
          <p className="text-[#6B6B6B] dark:text-white/70">Falha ao carregar os contatos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F4F2] dark:bg-[#0F0F0F]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] border-b border-[#E1DFDB] dark:border-[#262626]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-space-grotesk font-bold text-[clamp(1.75rem,4vw,2.5rem)] text-black dark:text-white mb-2">
                Meus Contatos
              </h1>
              <p className="font-inter italic text-sm text-[#6B6B6B] dark:text-white/70">
                — gerencie sua rede de contatos profissionais
              </p>
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="group inline-flex items-center bg-[#0B0907] hover:bg-[#1F1B18] active:bg-[#0B0907] dark:bg-[#1E1E1E] dark:hover:bg-[#262626] dark:active:bg-[#1E1E1E] text-white rounded-full h-12 px-6 transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span className="font-inter font-semibold text-sm">Adicionar Contato</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B6B6B] dark:text-white/50" />
            <input
              type="text"
              placeholder="Buscar por nome, contato ou serviços..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F9F7F5] dark:bg-[#0F0F0F] border border-[#E1DFDB] dark:border-[#262626] rounded-xl text-black dark:text-white placeholder-[#6B6B6B] dark:placeholder-white/50 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#E84A03] dark:focus:ring-[#FF6B1A] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#E84A03] dark:border-[#FF6B1A] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="font-inter text-[#6B6B6B] dark:text-white/70">Carregando contatos...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="font-space-grotesk font-bold text-xl text-black dark:text-white mb-2">
              {search ? 'Nenhum contato encontrado' : 'Nenhum contato cadastrado'}
            </h3>
            <p className="font-inter text-[#6B6B6B] dark:text-white/70 mb-6">
              {search ? 'Tente ajustar sua busca' : 'Comece adicionando seu primeiro contato'}
            </p>
            {!search && (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center bg-[#E84A03] hover:bg-[#D23E02] active:bg-[#B73502] dark:bg-[#FF6B1A] dark:hover:bg-[#FF5C05] dark:active:bg-[#EA4F00] text-white rounded-full h-12 px-6 font-inter font-semibold text-sm transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Primeiro Contato
              </button>
            )}
          </div>
        ) : (
          /* Table */
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E1DFDB] dark:border-[#262626] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:p-6 bg-[#F9F7F5] dark:bg-[#0F0F0F] border-b border-[#E1DFDB] dark:border-[#262626]">
              <div className="font-inter font-semibold text-sm text-black dark:text-white uppercase tracking-wide">Nome</div>
              <div className="font-inter font-semibold text-sm text-black dark:text-white uppercase tracking-wide">Portfólio</div>
              <div className="font-inter font-semibold text-sm text-black dark:text-white uppercase tracking-wide">Contato</div>
              <div className="font-inter font-semibold text-sm text-black dark:text-white uppercase tracking-wide">Serviços</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#E1DFDB] dark:divide-[#262626]">
              {contacts.map((contact) => (
                <div key={contact.id} className="group hover:bg-[#F9F7F5] dark:hover:bg-[#0F0F0F] transition-colors duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:p-6">
                    {/* Nome */}
                    <div className="flex flex-col">
                      <span className="font-inter font-medium text-black dark:text-white mb-1">{contact.name}</span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => setEditingContact(contact)}
                          className="p-1 hover:bg-[#E84A03] hover:text-white dark:hover:bg-[#FF6B1A] text-[#6B6B6B] dark:text-white/70 rounded transition-all duration-150"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-1 hover:bg-red-500 hover:text-white text-[#6B6B6B] dark:text-white/70 rounded transition-all duration-150"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Portfólio */}
                    <div className="flex flex-col">
                      <span className="font-inter text-sm text-[#6B6B6B] dark:text-white/50 uppercase tracking-wide mb-1 md:hidden">Portfólio</span>
                      {contact.portfolio ? (
                        <a
                          href={contact.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-inter text-[#E84A03] dark:text-[#FF6B1A] hover:underline"
                        >
                          Ver portfólio
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <span className="font-inter text-[#6B6B6B] dark:text-white/70 italic">Não informado</span>
                      )}
                    </div>

                    {/* Contato */}
                    <div className="flex flex-col">
                      <span className="font-inter text-sm text-[#6B6B6B] dark:text-white/50 uppercase tracking-wide mb-1 md:hidden">Contato</span>
                      <span className="font-inter text-black dark:text-white">{contact.contact}</span>
                    </div>

                    {/* Serviços */}
                    <div className="flex flex-col">
                      <span className="font-inter text-sm text-[#6B6B6B] dark:text-white/50 uppercase tracking-wide mb-1 md:hidden">Serviços</span>
                      <span className="font-inter text-[#6B6B6B] dark:text-white/70">{contact.services}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Contact Modal */}
      {(showAddForm || editingContact) && (
        <ContactModal
          contact={editingContact}
          onSubmit={(data) => {
            if (editingContact) {
              updateContactMutation.mutate({ id: editingContact.id, ...data });
            } else {
              addContactMutation.mutate(data);
            }
          }}
          onClose={() => {
            setShowAddForm(false);
            setEditingContact(null);
          }}
          isLoading={addContactMutation.isPending || updateContactMutation.isPending}
        />
      )}

      {/* Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
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

function ContactModal({ contact, onSubmit, onClose, isLoading }) {
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    portfolio: contact?.portfolio || '',
    contact: contact?.contact || '',
    services: contact?.services || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E1DFDB] dark:border-[#262626] w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-[#E1DFDB] dark:border-[#262626]">
          <h2 className="font-space-grotesk font-bold text-xl text-black dark:text-white">
            {contact ? 'Editar Contato' : 'Novo Contato'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-inter font-medium text-sm text-black dark:text-white mb-2">
              Nome *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#F9F7F5] dark:bg-[#0F0F0F] border border-[#E1DFDB] dark:border-[#262626] rounded-lg text-black dark:text-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#E84A03] dark:focus:ring-[#FF6B1A] focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block font-inter font-medium text-sm text-black dark:text-white mb-2">
              Portfólio
            </label>
            <input
              type="url"
              value={formData.portfolio}
              onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-[#F9F7F5] dark:bg-[#0F0F0F] border border-[#E1DFDB] dark:border-[#262626] rounded-lg text-black dark:text-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#E84A03] dark:focus:ring-[#FF6B1A] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block font-inter font-medium text-sm text-black dark:text-white mb-2">
              Contato *
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="email@exemplo.com ou telefone"
              className="w-full px-4 py-3 bg-[#F9F7F5] dark:bg-[#0F0F0F] border border-[#E1DFDB] dark:border-[#262626] rounded-lg text-black dark:text-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#E84A03] dark:focus:ring-[#FF6B1A] focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block font-inter font-medium text-sm text-black dark:text-white mb-2">
              Serviços *
            </label>
            <input
              type="text"
              value={formData.services}
              onChange={(e) => setFormData({ ...formData, services: e.target.value })}
              placeholder="Web Design, UX/UI, etc."
              className="w-full px-4 py-3 bg-[#F9F7F5] dark:bg-[#0F0F0F] border border-[#E1DFDB] dark:border-[#262626] rounded-lg text-black dark:text-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#E84A03] dark:focus:ring-[#FF6B1A] focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#E1DFDB] dark:border-[#262626] text-black dark:text-white rounded-lg font-inter font-medium text-sm hover:bg-[#F9F7F5] dark:hover:bg-[#0F0F0F] transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-[#E84A03] hover:bg-[#D23E02] active:bg-[#B73502] dark:bg-[#FF6B1A] dark:hover:bg-[#FF5C05] dark:active:bg-[#EA4F00] text-white rounded-lg font-inter font-medium text-sm transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Salvando...' : contact ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}