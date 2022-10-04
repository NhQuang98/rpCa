package demo3.service;

import demo3.domain.DS;
import demo3.repository.DSRepository;
import demo3.web.rest.vm.StudentVM;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DSService {

    @Autowired
    private final DSRepository dsRepository;

    public DSService(DSRepository dsRepository) {
        this.dsRepository = dsRepository;
    }

    public List<DS> getAllStudent() {
        return dsRepository.findAll();
    }

    public Optional<DS> getStudentById(Long id) {
        return dsRepository.findOneById(id);
    }

    public DS createStudent(StudentVM studentVM) {
        DS saveObj = new DS();
        saveObj.setCode(studentVM.getCode());
        saveObj.setName(studentVM.getName());
        saveObj.setMarks(studentVM.getMarks());
        saveObj.setClasses(studentVM.getClasses());
        dsRepository.save(saveObj);
        return saveObj;
    }

    public Optional<DS> updateStudent(StudentVM studentVM, Long id) {
        return dsRepository
            .findOneById(id)
            .map(ds -> {
                ds.setCode(studentVM.getCode());
                ds.setName(studentVM.getName());
                ds.setMarks(studentVM.getMarks());
                ds.setClasses(studentVM.getClasses());
                dsRepository.save(ds);
                return ds;
            });
    }

    public void deleteStudent(Collection<Long> id) {
        dsRepository.deleteDSByIdIn(id);
    }
}
