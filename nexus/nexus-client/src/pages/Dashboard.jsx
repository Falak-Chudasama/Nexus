import { useState, useEffect, useContext } from 'react';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight, X, Check, Mail } from 'lucide-react';

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [activeContracts, setActiveContracts] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({ title: '', description: '', type: 'Barter', tags: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    try {
      const [listingsRes, requestsRes, activeRes] = await Promise.all([
        API.get('/listings'),
        API.get('/contracts/incoming'),
        API.get('/contracts/active')
      ]);
      setListings(listingsRes.data);
      setIncomingRequests(requestsRes.data);
      setActiveContracts(activeRes.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleProposeExchange = async (listingId) => {
    try {
      await API.post('/contracts', { listingId });
      alert('Proposal sent! Waiting for the creator to accept.');
      fetchDashboardData(); 
    } catch (error) {
      alert(error.response?.data?.message || 'Error proposing exchange');
    }
  };

  const handleAcceptRequest = async (contractId) => {
    try {
      await API.put(`/contracts/${contractId}/activate`);
      fetchDashboardData();
    } catch (error) {
      alert('Failed to accept request');
    }
  };

  const handleRejectRequest = async (contractId) => {
    try {
      await API.put(`/contracts/${contractId}/reject`);
      fetchDashboardData();
    } catch (error) {
      alert('Failed to reject request');
    }
  };

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formattedTags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    try {
      await API.post('/listings', { ...formData, tags: formattedTags });
      fetchDashboardData();
      setFormData({ title: '', description: '', type: 'Barter', tags: '' });
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-6 py-12 relative">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Marketplace</h1>
          <p className="text-gray-500">Discover micro-tasks and skill barter opportunities.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          + Post a Request
        </button>
      </div>

      {/* --- INCOMING REQUESTS SECTION --- */}
      {incomingRequests.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Action Required: Pending Proposals
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {incomingRequests.map((req) => (
              <div key={req._id} className="bg-white border border-yellow-200 p-4 rounded-lg flex items-center justify-between shadow-sm">
                <div>
                  <p className="font-medium text-gray-900">{req.partyB.name} <span className="text-gray-500 font-normal text-sm">(Rep: {req.partyB.reputationScore})</span></p>
                  <p className="text-sm text-gray-600">Wants to exchange on: <span className="font-medium">"{req.listing.title}"</span></p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleRejectRequest(req._id)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
                    <X size={20} />
                  </button>
                  <button onClick={() => handleAcceptRequest(req._id)} className="flex items-center gap-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                    <Check size={16} /> Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ACTIVE EXCHANGES (EMAILS REVEALED) --- */}
      {activeContracts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4">Active Exchanges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeContracts.map((contract) => {
              // Determine who the *other* person is
              const otherParty = contract.partyA._id === user._id ? contract.partyB : contract.partyA;
              return (
                <div key={contract._id} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Working on: {contract.listing.title}</p>
                  <p className="font-medium text-gray-900 mb-3">Partner: {otherParty.name}</p>
                  <a href={`mailto:${otherParty.email}`} className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-3 py-1.5 rounded-md">
                    <Mail size={16} /> {otherParty.email}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- ALL MARKETPLACE LISTINGS --- */}
      <h2 className="text-lg font-bold mb-4">Open Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((listing) => (
          <div key={listing._id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-semibold uppercase tracking-wider rounded-full">
                {listing.type}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                {listing.creator.name} • Rep: {listing.creator.reputationScore}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow">{listing.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {listing.tags.map(tag => (
                <span key={tag} className="text-xs font-medium text-gray-500 border border-gray-200 px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>

            <button 
              onClick={() => handleProposeExchange(listing._id)}
              disabled={listing.creator._id === user._id}
              className="mt-auto w-full flex items-center justify-center gap-2 border border-black text-black py-2 rounded-md hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black disabled:cursor-not-allowed"
            >
              {listing.creator._id === user._id ? 'Your Listing' : 'Propose Exchange'}
              {listing.creator._id !== user._id && <ArrowRight size={16} />}
            </button>
          </div>
        ))}
        
        {listings.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-500 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
            No open listings available right now. Be the first to post one!
          </div>
        )}
      </div>

      {/* --- MODAL LOGIC (Kept exactly as before) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold">Create a Listing</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handlePostSubmit} className="p-6 space-y-5">
              {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-100">{error}</div>}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Type</label>
                <select name="type" value={formData.type} onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white">
                  <option value="Barter">Skill Barter (Swap)</option>
                  <option value="Micro-Task">Micro-Task (Reputation Only)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" required rows="3" value={formData.description} onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags <span className="text-gray-400 font-normal">(comma separated)</span></label>
                <input type="text" name="tags" value={formData.tags} onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-70">
                  {isSubmitting ? 'Posting...' : 'Post Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;