'use client';
import { Container } from '@/components/shared/container';
import { SelectCategory } from '@/components/shared/select-category';
import { UploadImage, UploadImageInput } from '@/components/shared/upload-image-input';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Upload } from 'lucide-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export const condition = [
  { id: 1, name: 'Yeni gibi' },
  { id: 2, name: 'Az kullanılmış' },
  { id: 3, name: 'İyi durumda' },
  { id: 4, name: 'Kullanılmamış' },
];

const formSchema = z.object({
  name: z.string().min(3, 'Minimum 3').max(50, 'Maksimum 50'),
  category: z.string().min(1, 'Lütfen bir kategori seçin'),
  condition: z.string().min(1, 'Lütfen ürün tipini belirtin'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır'),
  price: z.number().min(1, 'Fiyat girmek zorunludur'),
  campus: z.string().min(10, 'Kampüs en az 3 karakter olmalıdır'),
  media: z.object({
    images: z
      .array(
        z.object({
          file: z.any(),
          isMain: z.boolean(),
        }),
      )
      .min(1, 'En az 1 fotoğraf yüklemelisiniz')
      .max(5, 'En fazla 5 fotoğraf yükleyebilirsiniz'),
  }),
});
type Form = z.infer<typeof formSchema>;
export type ProductFormValues = z.infer<typeof formSchema>;
export default function NewProduct() {
  const [categories, setCategories] = React.useState([]);
  const router = useRouter();
  React.useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        'https://kampustakas-backend-production.up.railway.app/api/categories',
      );
      setCategories(res.data.data);
    };
    fetchCategories();
  }, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      condition: '',
      campus: '',
      description: '',
      price: '' as unknown as number,
      media: {
        images: [],
      },
    },
  });

  const onSubmit = async (data: Form) => {
    console.log(data);
    const token = Cookies.get('token');
    const uploadImages = [];
    for (const img of data.media.images) {
      const fileFormData = new FormData();
      fileFormData.append('file', img.file);

      const uploadRes = await axios.post('/api/upload', fileFormData);
      const realImageUrl = uploadRes.data.url;

      uploadImages.push({
        imageUrl: realImageUrl,
        isMain: img.isMain,
      });
    }
    try {
      const formData = {
        categoryId: Number(data.category),
        title: data.name,
        description: data.description,
        // condition: data.condition,
        condition: 'Iyi',
        estimatedMinPrice: data.price,
        estimatedMaxPrice: data.price,
        campus: data.campus,
        images: uploadImages,
      };
      const res = await axios.post(
        'https://kampustakas-backend-production.up.railway.app/api/products',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success('Ürün başarıyla oluşturuldu!');
      console.log('Данные формы:', data);
      router.push('/profile');
    } catch (error: any) {
      console.error('Ошибка создания:', error);
      const errorMessage = error.response?.data?.message || 'Ürün yüklenirken bir hata oluştu.';
      alert(errorMessage);
    }
  };
  return (
    <Container className="mb-[100px]">
      <h1 className="text-[24px] font-bold mt-[30px]">Yeni İlan Oluştur</h1>
      <p className="text-gray-400 text-[15px]">
        Kampüsteki diğer öğrencilere göstermek istediğin ürünü detaylandır.
      </p>

      <div className="mt-[40px]">
        <h2 className="uppercase text-[14px] ">Ürün Fotoğrafları (Maksimum 3)</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              control={control}
              name="media"
              render={({ field }) => (
                <UploadImageInput onValueChange={field.onChange} value={field.value} />
              )}
            />
            {errors.media?.images && (
              <p className="text-red-500 text-xs mt-2">{errors.media.images.message}</p>
            )}
          </div>
          <div className="mt-10">
            <Field>
              <Label className="text-gray-500 uppercase text-[14px]">Ürün adı</Label>
              <Input
                {...register('name')}
                name="name"
                className="h-[45px]"
                placeholder="Örn: Python programlama kitabı"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
              )}
            </Field>
            <div className="flex flex-col sm:flex-row gap-3 mt-[30px]">
              <Field className="flex-1">
                <Label className="text-gray-500 uppercase text-[14px]">Kategori</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <SelectCategory
                      onValueChange={field.onChange}
                      value={field.value}
                      className="h-[45px]"
                      items={categories}
                      title={'Kategori'}
                    />
                  )}
                />
                {errors.category && (
                  <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>
                )}
              </Field>
              <Field className="flex-1">
                <Label className="text-gray-500 uppercase text-[14px]">Durum</Label>
                <Controller
                  control={control}
                  name="condition"
                  render={({ field }) => (
                    <SelectCategory
                      value={field.value}
                      onValueChange={field.onChange}
                      className="h-[45px]"
                      items={condition}
                      title={'Durum'}
                    />
                  )}
                />
                {errors.condition && (
                  <span className="text-red-500 text-xs mt-1">{errors.condition.message}</span>
                )}
              </Field>
            </div>
            <Field className="mt-[20px]">
              <Label className="text-gray-500 uppercase text-[14px]">Ürün fiyatı</Label>
              <Input
                {...register('price', { valueAsNumber: true })}
                name="price"
                className="h-[45px]"
                placeholder="Ürün fiyatı"
                type="number"
              />
              {errors.price && (
                <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>
              )}
            </Field>
            <Field>
              <Label className="text-gray-500 uppercase text-[14px]">Kampüs</Label>
              <Input
                {...register('campus')}
                name="campus"
                className="h-[45px]"
                placeholder="Örn: Göztepe Kampüsü"
              />
              {errors.campus && (
                <span className="text-red-500 text-xs mt-1">{errors.campus.message}</span>
              )}
            </Field>
            <Field className="mt-[20px]">
              <Label className="text-gray-500 uppercase text-[14px]">Açıklama</Label>
              <Textarea
                {...register('description')}
                name="description"
                placeholder="Ürünü kondisyonu, kullanımı süresi veya takas seçeneklerini belirtin..."
                className="h-[300px]"
              />
              {errors.description && (
                <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>
              )}
            </Field>
          </div>
          <button className="mt-10 mx-auto hover:bg-secondary/70 flex items-center justify-center cursor-pointer gap-2 bg-secondary text-white w-[200px] h-[40px] rounded-xl">
            <Upload />
            Yayınla
          </button>
        </form>
      </div>
    </Container>
  );
}
