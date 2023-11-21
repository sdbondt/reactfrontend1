export const createQueryString = (searchParams) => {
    const params = new URLSearchParams();
  
    if (searchParams.q) {
      params.set('q', searchParams.q);
    }
  
    params.set('page', searchParams.page.toString());
    params.set('direction', searchParams.direction);
    params.set('sortBy', searchParams.sortBy);
    params.set('limit', searchParams.limit.toString());
  
    return params.toString() ? `?${params.toString()}` : '';
  }
  