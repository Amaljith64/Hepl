from rest_framework import serializers
from .models import InsurancePolicy

class InsurancePolicySerializer(serializers.ModelSerializer):
    type_name=serializers.CharField(source='get_type_display',read_only=True)
    class Meta:
        model = InsurancePolicy
        fields = ['id', 'name', 'type', 'premium', 'coverage','type_name']