'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type StoreProduct = {
  id: number
  name: string
  price: number
  category: string
  image_url: string
  description?: string
  style?: string
  volume?: string
}

const DashboardPage = () => {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('Store Owner')
  const [products, setProducts] = useState<StoreProduct[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Essentials')
  const [style, setStyle] = useState('')
  const [volume, setVolume] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [editingProductId, setEditingProductId] = useState<number | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      setEmail(data.user?.email ?? 'Store Owner')
      await loadProducts()
    }

    loadUser()
  }, [])

  const loadProducts = async () => {
    const { data, error: productsError } = await supabase
      .from('products')
      .select('id, name, price, category, image_url')
      .order('created_at', { ascending: false })

    if (productsError) {
      setError(productsError.message)
      return
    }

    setProducts(data ?? [])
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files?.[0] ?? null)
  }

  const resetForm = () => {
    setName('')
    setPrice('')
    setCategory('Essentials')
    setStyle('')
    setVolume('')
    setDescription('')
    setImage(null)
    setEditingProductId(null)
  }

  const handleCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!image && editingProductId === null) {
      setError('Choose a product image first.')
      return
    }

    setIsSaving(true)

    try {
      let imageUrl = ''

      if (image) {
        const slug = `${name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now()}`
        const filePath = `${crypto.randomUUID()}-${image.name}`
        const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, image)

        if (uploadError) {
          setError(uploadError.message)
          return
        }

        const { data: imageData } = supabase.storage.from('product-images').getPublicUrl(filePath)
        imageUrl = imageData.publicUrl
      }

      if (editingProductId !== null) {
        const { error: updateError } = await supabase
          .from('products')
          .update({
            name,
            price: Number(price),
            category,
            style,
            volume,
            description,
            ...(imageUrl ? { image_url: imageUrl } : {}),
          })
          .eq('id', editingProductId)

        if (updateError) {
          setError(updateError.message)
          return
        }

        setMessage('Product updated successfully.')
      } else {
        const slug = `${name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now()}`

        const { error: productError } = await supabase.from('products').insert({
          slug,
          name,
          price: Number(price),
          image_url: imageUrl,
          description,
          category,
          style,
          volume,
        })

        if (productError) {
          setError(productError.message)
          return
        }

        setMessage('Product added successfully.')
      }

      resetForm()
      await loadProducts()
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditProduct = (product: StoreProduct) => {
    setEditingProductId(product.id)
    setName(product.name)
    setPrice(String(product.price))
    setCategory(product.category)
    setStyle(product.style ?? '')
    setVolume(product.volume ?? '')
    setDescription(product.description ?? '')
    setImage(null)
    setError('')
    setMessage('Editing product: ' + product.name)
  }

  const handleDeleteProduct = async (id: number) => {
    setError('')
    const { error: deleteError } = await supabase.from('products').delete().eq('id', id)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id))
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch {
      // optional: leave as no-op when the app is used without Supabase auth
    }
    router.push('/login')
    router.refresh()
  }

  return (
    <main className="px-4 py-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex flex-col justify-between gap-6 border-b border-stone-200 pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-rose-500">Owner dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-800">Manage your store</h1>
          <p className="mt-3 text-sm text-stone-500">Signed in as {email}</p>
        </div>
        <button onClick={handleSignOut} className="w-fit rounded-md border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">
          Sign out
        </button>
      </div>

      <section className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <form onSubmit={handleCreateProduct} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-medium text-stone-800">{editingProductId !== null ? 'Edit product' : 'Add a product'}</h2>
          <div className="mt-6 space-y-4">
            <input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Product name" className="w-full rounded-md border border-stone-300 px-3 py-3" />
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={price} onChange={(event) => setPrice(event.target.value)} required min="0" step="0.01" type="number" placeholder="Price" className="w-full rounded-md border border-stone-300 px-3 py-3" />
              <input value={category} onChange={(event) => setCategory(event.target.value)} required placeholder="Category" className="w-full rounded-md border border-stone-300 px-3 py-3" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={style} onChange={(event) => setStyle(event.target.value)} placeholder="Style" className="w-full rounded-md border border-stone-300 px-3 py-3" />
              <input value={volume} onChange={(event) => setVolume(event.target.value)} placeholder="Size or fit" className="w-full rounded-md border border-stone-300 px-3 py-3" />
            </div>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} required placeholder="Description" rows={4} className="w-full rounded-md border border-stone-300 px-3 py-3" />
            <input onChange={handleImageChange} type="file" accept="image/*" className="w-full rounded-md border border-stone-300 px-3 py-3 text-sm" />
            {editingProductId !== null && <p className="text-xs text-stone-500">Leave the image blank to keep the current image.</p>}
          </div>
          {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          <div className="mt-6 flex gap-3">
            <button disabled={isSaving} className="w-full rounded-md bg-stone-900 px-4 py-3 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-60">
              {isSaving ? (editingProductId !== null ? 'Updating product...' : 'Adding product...') : (editingProductId !== null ? 'Update product' : 'Add product')}
            </button>
            {editingProductId !== null && (
              <button type="button" onClick={resetForm} className="rounded-md border border-stone-300 px-4 py-3 text-sm text-stone-700 hover:bg-stone-100">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div>
          <h2 className="text-xl font-medium text-stone-800">Your products</h2>
          <div className="mt-6 space-y-4">
            {products.length === 0 && <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-sm text-stone-500">No products added yet.</p>}
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <img src={product.image_url} alt={product.name} className="h-20 w-20 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-stone-800">{product.name}</h3>
                  <p className="text-sm text-stone-500">{product.category} · ${product.price}</p>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => handleEditProduct(product)} className="text-sm text-stone-700 hover:underline">Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default DashboardPage
