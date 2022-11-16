<?php
declare(strict_types=1);

namespace App\Form;

use App\Entity\Track;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\UX\Autocomplete\Form\AsEntityAutocompleteField;
use Symfony\UX\Autocomplete\Form\ParentEntityAutocompleteType;

#[AsEntityAutocompleteField]
class FavoriteTrackAutocompleteField extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'class' => Track::class,
            'placeholder' => 'Choose a song',
            'choice_label' => function(Track $track) {
                return sprintf('%s (by %s)', $track->getSongTitle(), $track->getArtistName());
            },
//            https://symfony.com/bundles/ux-autocomplete/current/index.html#form-options-reference
//            'security' => function(Security $security): bool {
//                return $security->isGranted('ROLE_FOO');
//            }
        ]);
    }

    public function getParent(): string
    {
        return ParentEntityAutocompleteType::class;
    }
}