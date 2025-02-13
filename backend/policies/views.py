from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework.exceptions import ValidationError
from .models import InsurancePolicy
from .serializers import InsurancePolicySerializer
from rest_framework import status


class InsurancePolicyListView(APIView):
    def get(self, request):
        """
        Retrieve a list of insurance policies with optional filtering and sorting.
        """
        try:

            # Get the queryset
            queryset = InsurancePolicy.objects.all()
            
            # Apply name search filter
            name = request.query_params.get('name', None)
            if name:
                queryset = queryset.filter(name__icontains=name)
            
            # Apply premium range filter
            min_premium = request.query_params.get('min_premium', None)
            max_premium = request.query_params.get('max_premium', None)
            if min_premium:
                queryset = queryset.filter(premium__gte=min_premium)
            if max_premium:
                queryset = queryset.filter(premium__lte=max_premium)
            
            # Apply policy type filter
            policy_type = request.query_params.get('type', None)
            if policy_type:
                queryset = queryset.filter(type=policy_type)
            
            # Apply minimum coverage filter
            min_coverage = request.query_params.get('min_coverage', None)
            if min_coverage:
                queryset = queryset.filter(coverage__gte=min_coverage)
            
            # Apply sorting
            sort_by = request.query_params.get('sort', None)
            if sort_by == 'premium_asc':
                queryset = queryset.order_by('premium')
            elif sort_by == 'premium_desc':
                queryset = queryset.order_by('-premium')
            
            # Serialize and return data
            serializer = InsurancePolicySerializer(queryset, many=True)
            return Response(serializer.data)
        
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    
    def post(self,request):
        serializer = InsurancePolicySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)