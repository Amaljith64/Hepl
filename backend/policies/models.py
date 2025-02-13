from django.db import models

class InsurancePolicy(models.Model):
    class PolicyType(models.TextChoices):
        TERM_LIFE = 'TL', 'Term Life'
        HEALTH = 'HL', 'Health'
        VEHICLE = 'VH', 'Vehicle'

    name = models.CharField(max_length=200)
    type = models.CharField(max_length=2,choices=PolicyType.choices,default=PolicyType.TERM_LIFE)
    premium = models.DecimalField(max_digits=10, decimal_places=2)
    coverage = models.DecimalField(max_digits=12, decimal_places=2)
    
    def __str__(self):
        return self.name