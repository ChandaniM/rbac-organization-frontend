interface SearchProps {
  onSearch: (value: string) => void;
}

export const SearchInput = ({ onSearch }: SearchProps) => (
  <div className='flex items-center gap-2'>
    <label className='text-sm font-medium text-gray-600'>Search:</label>
    <input
      type='text'
      onChange={(e) => onSearch(e.target.value)}
      placeholder='Search users...'
      className='border rounded px-3 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm w-64'
    />
  </div>
);
