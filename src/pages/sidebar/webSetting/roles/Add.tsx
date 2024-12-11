import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { add } from '@/redux/slices/rolesSlice';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { fetchPermissions } from '@/redux/slices/commonSlice';

const Add: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getApiError, setApiError] = useState('');
  const { permissions: allPermissions, isLoading: commonDataLoading } = useSelector((state: RootState) => state.commonData);

  console.log(commonDataLoading);

  const [formData, setFormData] = useState({
    name: '',
    permissions: [] as string[],
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPermissions({ per_page: 1000 }));
  }, [dispatch]);

  const handleCheckboxChange = (permissionId: string) => {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.permissions.includes(permissionId);
      return {
        ...prevFormData,
        permissions: isSelected
          ? prevFormData.permissions.filter((id) => id !== permissionId)
          : [...prevFormData.permissions, permissionId],
      };
    });
  };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   try {
  //     await dispatch(add(formData)).unwrap();
  //     toast({
  //       title: "Success",
  //       description: "Role added successfully!",
  //     });
  //     setFormData({ name: '', permissions: [] });
  //     setOpen(false);
  //   } catch (error: any) {
  //     console.error("Failed to add role:", error);
  //     setApiError(error.message || 'An error occurred while adding the role');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create a FormData object
      const data = new FormData();
      data.append("name", formData.name);
      formData.permissions.forEach((permission) => {
        data.append("permissions[]", permission); // Append each permission
      });

      // Dispatch the action with FormData
      await dispatch(add(data)).unwrap();

      toast({
        title: "Success",
        description: "Role added successfully!",
      });
      setFormData({ name: "", permissions: [] });
      setOpen(false);
    } catch (error: any) {
      console.error("Failed to add role:", error);
      setApiError(error.message || "An error occurred while adding the role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New</Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-xl shadow-2xl bg-white p-8 border border-gray-200"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter role name"
                required
              />
              {getApiError && <p className="text-red-500">{getApiError}</p>}
            </div>

            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Permissions</h3>
              {allPermissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {allPermissions.map((per: any) => (
                    <label
                      key={per.id}
                      htmlFor={`permission${per.id}`}
                      className="flex items-center p-2 bg-gray-100 rounded-md border border-gray-300 shadow-sm hover:bg-gray-200 transition cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={`permission${per.id}`}
                        value={per.id}
                        checked={formData.permissions.includes(per.id.toString())}
                        onChange={() => handleCheckboxChange(per.id.toString())}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium">{per.name}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No permissions available.</p>
              )}
            </div>

          </div>

          <DialogFooter className="mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Submit'
              )}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Add;
