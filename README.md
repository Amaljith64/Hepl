### Backend

1. Navigate to the `backend` directory.
2. Install dependencies: `pip install -r requirements.txt`
3. Run migrations: `python manage.py migrate`
4. Start the server: `python manage.py runserver`

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`


### My Approach

1. First, I identified the core features: policy listing, search, filtering, and sorting
2. Then, I designed the data model, wrote views and API endpoints needed
3. designed and created the frontend as per the requirement in a minimal way.
4. fixed cors error
5. implemented functionalities in the frontend for listing and filtering.


### Challenges Faced

1. Managing multiple filter states on the frontend while keeping the UI responsive


### improvements

1. implement debouncing for search
2. Add pagination for large datasets
3. Improve UI/UX with animations and better feedback

### Trade-offs

1. Limited ui feature



1. Implement caching
2. Add pagination
3. Implemented debouncing
4. indexing 
5. React.memo and useMemo
6. implement Ratelimiting