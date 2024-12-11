import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { update } from '@/redux/slices/rolesSlice';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/redux/store';
import { fetchPermissions } from '@/redux/slices/commonSlice';

type EditSliderProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const Edit: React.FC<EditSliderProps> = ({ Id }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<{
    roleId: null | string;
    permissions: string[];
  }>({
    roleId: null,
    permissions: [],
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const roleData = useSelector((state: RootState) => state.rolesData.roles);
  const { permissions: allPermissions, isLoading: commonDataLoading } = useSelector((state: RootState) => state.commonData);

  if (commonDataLoading) {
    console.log('edit page data ', allPermissions);
  }

  const roleToEdit = roleData.find((role) => role.id.toString() === Id);

  useEffect(() => {
    dispatch(fetchPermissions({ per_page: 1000 }));

    if (roleToEdit) {
      setFormData({
        roleId: roleToEdit.id,
        permissions: roleToEdit.permissions.map((perm: any) => perm.id.toString()),
      });
    }
  }, [roleToEdit]);

  const handleCheckboxChange = (permissionId: string) => {
    setFormData((prevData) => {
      const permissions = prevData.permissions.includes(permissionId)
        ? prevData.permissions.filter(id => id !== permissionId)
        : [...prevData.permissions, permissionId];
      return { ...prevData, permissions };
    });
  };

  const handleToggleCheckAll = () => {
    if (formData.permissions.length === allPermissions.length) {
      // Uncheck all if all are already checked
      setFormData({
        ...formData,
        permissions: [],
      });
    } else {
      // Check all if not all are checked
      setFormData({
        ...formData,
        permissions: allPermissions.map((perm: any) => perm.id.toString()),
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const Data = new FormData();

    Data.append('id', formData.roleId?.toString() || '');

    formData.permissions.forEach(permissionId => {
      Data.append('permissions[]', permissionId);
    });

    Data.append('_method', 'PUT');

    try {
      await dispatch(update({ id: Id, data: Data }));

      toast({
        title: 'Success',
        description: 'Data updated successfully!',
      });
      setOpen(false);
    } catch (error) {
      console.error('Data to update :', error);
      toast({
        title: 'Error',
        description: 'Failed to update Data. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!roleToEdit) {
    return null; // Or render a loading state
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 mt-1 w-40 bg-slate-300 text-white hover:bg-slate-400 transition">Edit</Button>
      </DialogTrigger>

      <DialogContent
        className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-xl shadow-2xl bg-white p-8 border border-gray-200"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <DialogHeader>
          <DialogTitle>Edit Roles <span className='text-capitalize'>{roleToEdit?.name}</span></DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            <Button type="button" onClick={handleToggleCheckAll} className="bg-blue-500 text-white">
              {formData.permissions.length === allPermissions.length ? 'Uncheck All' : 'Check All'}
            </Button>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allPermissions.map((per: any) => (
              <div key={per.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`permissions${per.id}`}
                  value={per.id.toString()}
                  checked={formData.permissions.includes(per.id.toString())}
                  onChange={() => handleCheckboxChange(per.id.toString())}
                />
                <span>{per.name}</span>
              </div>
            ))}
          </div> */}


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allPermissions.map((per: any) => (
              <label
                key={per.id}
                htmlFor={`permissions${per.id}`}
                className="flex items-center p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={`permissions${per.id}`}
                  value={per.id.toString()}
                  checked={formData.permissions.includes(per.id.toString())}
                  onChange={() => handleCheckboxChange(per.id.toString())}
                  className="mr-2"
                />
                <span className="text-sm">{per.name}</span>
              </label>
            ))}
          </div>


          <DialogFooter className="mt-4">
            <Button type="submit">Submit</Button>
            <p className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 transition" onClick={() => setOpen(false)}>
              Cancel
            </p>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
