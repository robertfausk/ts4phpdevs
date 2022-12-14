<?php

namespace App\Twig\Components;

use App\Form\RegistrationFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\ComponentWithFormTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent('registration_form')]
final class RegistrationFormComponent extends AbstractController
{
    use DefaultActionTrait;
    use ComponentWithFormTrait;

    protected function instantiateForm(): FormInterface
    {
        return $this->createForm(RegistrationFormType::class);
    }

    private function getDataModelValue(): ?string // overwrites <form data-mode="on(change)|*"
    {
        return 'on(input)|*';
        // return 'on(input)|debounce(500)|*'; // with debounce change
    }
}
