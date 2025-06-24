import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import LoadingSpinner from '../../components/compo/LoadingSpinner';

const Rentals = () => {
  const { user } = useUser();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated API call
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulated data based on user type
        const mockData = user?.userType === 'owner' 
          ? [
              { id: 1, name: "Downtown Apartment", status: "Rented", tenant: "John Doe" },
              { id: 2, name: "Suburban House", status: "Vacant", tenant: null }
            ]
          : [
              { id: 1, name: "City Studio", landlord: "Sarah Smith", leaseEnd: "2024-12-31" },
              { id: 2, name: "Garden Apartment", landlord: "Mike Johnson", leaseEnd: "2025-06-30" }
            ];
        
        setRentals(mockData);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.userType === 'owner' ? 'Managed Properties' : 'My Rentals'}
          </h1>
          
          {user?.userType === 'owner' && (
            <Link 
              to="/add-property"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add New Property
            </Link>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : rentals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              {user?.userType === 'owner' 
                ? "You don't have any properties listed yet."
                : "You don't have any active rentals."}
            </p>
            <Link
              to="/properties"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Browse available properties →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.map((rental) => (
              <div key={rental.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{rental.name}</h3>
                
                {user?.userType === 'owner' ? (
                  <>
                    <div className="mb-4">
                      <span className="inline-block px-2 py-1 text-sm rounded-md bg-gray-100">
                        Status: {rental.status}
                      </span>
                    </div>
                    {rental.tenant && (
                      <p className="text-gray-600 mb-2">Tenant: {rental.tenant}</p>
                    )}
                    <div className="mt-4 flex space-x-2">
                      <Link
                        to={`/properties/${rental.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        View Details
                      </Link>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        Manage
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 mb-2">Landlord: {rental.landlord}</p>
                    <p className="text-gray-600 mb-4">
                      Lease End: {new Date(rental.leaseEnd).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <Link
                        to={`/rentals/${rental.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        View Agreement
                      </Link>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        Renew Lease
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rentals;